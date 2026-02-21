#!/bin/bash
set -euo pipefail

# CarMarket365 Database Restore Script
#
# Usage:
#   ./scripts/restore.sh <backup_file>              # Restore from local file
#   ./scripts/restore.sh --from-s3 <s3_key>         # Restore from S3
#   ./scripts/restore.sh --list                      # List available local backups
#   ./scripts/restore.sh --list-s3                   # List available S3 backups
#   ./scripts/restore.sh --verify <backup_file>      # Verify backup without restoring
#
# Required env vars:
#   DATABASE_URL - PostgreSQL connection string (target database)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

DB_URL="${DATABASE_URL:?DATABASE_URL environment variable is required}"
BACKUP_DIR="${BACKUP_DIR:-$PROJECT_ROOT/backups}"
S3_BUCKET="${BACKUP_S3_BUCKET:-}"
S3_REGION="${BACKUP_S3_REGION:-eu-central-1}"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

list_local_backups() {
  log "Local backups in $BACKUP_DIR:"
  echo ""
  if [[ -d "$BACKUP_DIR" ]]; then
    ls -lhS "$BACKUP_DIR"/*.sql.gz 2>/dev/null || echo "  No backups found."
  else
    echo "  Backup directory does not exist."
  fi
}

list_s3_backups() {
  if [[ -z "$S3_BUCKET" ]]; then
    log "BACKUP_S3_BUCKET not configured"
    exit 1
  fi
  log "S3 backups in $S3_BUCKET:"
  echo ""
  aws s3 ls "$S3_BUCKET/" --region "$S3_REGION" --human-readable
}

verify_backup() {
  local backup_file="$1"
  log "Verifying backup: $backup_file"

  if [[ ! -f "$backup_file" ]]; then
    log "ERROR: File not found: $backup_file"
    exit 1
  fi

  # Check gzip integrity
  if gzip -t "$backup_file" 2>/dev/null; then
    log "Compression integrity: PASSED"
  else
    log "Compression integrity: FAILED"
    exit 1
  fi

  # Check for PostgreSQL content
  local has_tables
  has_tables=$(zcat "$backup_file" | head -100 | grep -c "CREATE TABLE\|pg_dump" || true)
  if [[ "$has_tables" -gt 0 ]]; then
    log "PostgreSQL content: DETECTED"
  else
    log "WARNING: No PostgreSQL content detected in first 100 lines"
  fi

  # Show backup stats
  local file_size
  file_size=$(du -h "$backup_file" | cut -f1)
  local line_count
  line_count=$(zcat "$backup_file" | wc -l | tr -d ' ')
  local table_count
  table_count=$(zcat "$backup_file" | grep -c "^CREATE TABLE" || true)

  log "Summary:"
  log "  File size: $file_size"
  log "  Lines: $line_count"
  log "  Tables: $table_count"
  log "Verification complete."
}

restore_backup() {
  local backup_file="$1"

  if [[ ! -f "$backup_file" ]]; then
    log "ERROR: File not found: $backup_file"
    exit 1
  fi

  log "WARNING: This will overwrite the target database!"
  log "Target: $DB_URL"
  log "Source: $backup_file"
  echo ""
  read -p "Type 'RESTORE' to confirm: " confirmation

  if [[ "$confirmation" != "RESTORE" ]]; then
    log "Restore cancelled."
    exit 0
  fi

  # Verify first
  verify_backup "$backup_file"

  echo ""
  log "Creating pre-restore safety backup..."
  local safety_backup="$BACKUP_DIR/pre_restore_$(date +%Y%m%d_%H%M%S).sql.gz"
  mkdir -p "$BACKUP_DIR"
  pg_dump "$DB_URL" --no-owner --no-privileges | gzip > "$safety_backup"
  log "Safety backup: $safety_backup"

  log "Restoring database..."
  zcat "$backup_file" | psql "$DB_URL" --single-transaction --set ON_ERROR_STOP=on 2>&1

  log "Restore complete!"
  log "Running ANALYZE to update statistics..."
  psql "$DB_URL" -c "ANALYZE;" > /dev/null 2>&1

  # Quick row count verification
  log "Post-restore verification:"
  psql "$DB_URL" -c "
    SELECT 'users' as table_name, COUNT(*) as rows FROM users
    UNION ALL SELECT 'cars', COUNT(*) FROM cars
    UNION ALL SELECT 'car_images', COUNT(*) FROM car_images
    UNION ALL SELECT 'car_views', COUNT(*) FROM car_views
    UNION ALL SELECT 'car_inquiries', COUNT(*) FROM car_inquiries
    UNION ALL SELECT 'saved_cars', COUNT(*) FROM saved_cars
    ORDER BY table_name;"

  log "Restore completed successfully!"
  log "Safety backup available at: $safety_backup"
}

# Main
case "${1:-}" in
  --list)
    list_local_backups
    ;;
  --list-s3)
    list_s3_backups
    ;;
  --verify)
    if [[ -z "${2:-}" ]]; then
      echo "Usage: $0 --verify <backup_file>"
      exit 1
    fi
    verify_backup "$2"
    ;;
  --from-s3)
    if [[ -z "${2:-}" ]]; then
      echo "Usage: $0 --from-s3 <s3_key>"
      exit 1
    fi
    if [[ -z "$S3_BUCKET" ]]; then
      log "ERROR: BACKUP_S3_BUCKET not configured"
      exit 1
    fi
    TEMP_FILE="$BACKUP_DIR/$(basename "$2")"
    mkdir -p "$BACKUP_DIR"
    log "Downloading from S3: $S3_BUCKET/$2"
    aws s3 cp "$S3_BUCKET/$2" "$TEMP_FILE" --region "$S3_REGION"
    restore_backup "$TEMP_FILE"
    ;;
  "")
    echo "CarMarket365 Database Restore Tool"
    echo ""
    echo "Usage:"
    echo "  $0 <backup_file>           Restore from local backup"
    echo "  $0 --from-s3 <s3_key>      Restore from S3 backup"
    echo "  $0 --list                  List local backups"
    echo "  $0 --list-s3               List S3 backups"
    echo "  $0 --verify <backup_file>  Verify backup integrity"
    ;;
  *)
    restore_backup "$1"
    ;;
esac
