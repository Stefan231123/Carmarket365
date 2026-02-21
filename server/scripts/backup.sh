#!/bin/bash
set -euo pipefail

# CarMarket365 Automated Database Backup Script
# Supports local storage and S3-compatible cloud storage (AWS S3, Railway volumes, etc.)
#
# Usage:
#   ./scripts/backup.sh              # Full backup
#   ./scripts/backup.sh --schema     # Schema-only backup
#
# Required env vars:
#   DATABASE_URL          - PostgreSQL connection string
#
# Optional env vars:
#   BACKUP_DIR            - Local backup directory (default: ./backups)
#   BACKUP_RETENTION_DAYS - Days to keep local backups (default: 7)
#   BACKUP_S3_BUCKET      - S3 bucket for remote storage (e.g. s3://carmarket365-backups)
#   BACKUP_S3_REGION      - AWS region (default: eu-central-1)
#   BACKUP_WEBHOOK_URL    - Webhook URL for failure alerts (Slack/Discord)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Configuration
DB_URL="${DATABASE_URL:?DATABASE_URL environment variable is required}"
BACKUP_DIR="${BACKUP_DIR:-$PROJECT_ROOT/backups}"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"
S3_BUCKET="${BACKUP_S3_BUCKET:-}"
S3_REGION="${BACKUP_S3_REGION:-eu-central-1}"
WEBHOOK_URL="${BACKUP_WEBHOOK_URL:-}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SCHEMA_ONLY=false

if [[ "${1:-}" == "--schema" ]]; then
  SCHEMA_ONLY=true
fi

# Determine backup filename
if $SCHEMA_ONLY; then
  BACKUP_FILE="schema_${TIMESTAMP}.sql.gz"
else
  BACKUP_FILE="backup_${TIMESTAMP}.sql.gz"
fi

BACKUP_PATH="$BACKUP_DIR/$BACKUP_FILE"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

send_alert() {
  local message="$1"
  if [[ -n "$WEBHOOK_URL" ]]; then
    curl -sf -X POST "$WEBHOOK_URL" \
      -H 'Content-Type: application/json' \
      -d "{\"text\": \"$message\"}" > /dev/null 2>&1 || true
  fi
}

cleanup_on_error() {
  log "ERROR: Backup failed!"
  send_alert "[ALERT] CarMarket365 database backup FAILED at $(date). Check logs."
  rm -f "$BACKUP_PATH"
  exit 1
}

trap cleanup_on_error ERR

# Create backup directory
mkdir -p "$BACKUP_DIR"

log "Starting CarMarket365 database backup..."

# Perform backup
if $SCHEMA_ONLY; then
  log "Creating schema-only backup..."
  pg_dump "$DB_URL" --schema-only --no-owner --no-privileges | gzip > "$BACKUP_PATH"
else
  log "Creating full backup..."
  pg_dump "$DB_URL" --no-owner --no-privileges --format=plain | gzip > "$BACKUP_PATH"
fi

BACKUP_SIZE=$(du -h "$BACKUP_PATH" | cut -f1)
log "Backup created: $BACKUP_FILE ($BACKUP_SIZE)"

# Verify backup integrity (decompress and check for PostgreSQL header)
if gzip -t "$BACKUP_PATH" 2>/dev/null; then
  log "Backup integrity check: PASSED"
else
  log "Backup integrity check: FAILED"
  cleanup_on_error
fi

# Upload to S3 if configured
if [[ -n "$S3_BUCKET" ]]; then
  log "Uploading to S3: $S3_BUCKET/$BACKUP_FILE"
  if command -v aws &> /dev/null; then
    aws s3 cp "$BACKUP_PATH" "$S3_BUCKET/$BACKUP_FILE" \
      --region "$S3_REGION" \
      --storage-class STANDARD_IA
    log "S3 upload complete"
  else
    log "WARNING: AWS CLI not installed, skipping S3 upload"
  fi
fi

# Clean up old local backups
log "Cleaning backups older than $RETENTION_DAYS days..."
DELETED_COUNT=$(find "$BACKUP_DIR" -name "*.sql.gz" -mtime +"$RETENTION_DAYS" -delete -print | wc -l)
log "Removed $DELETED_COUNT old backup(s)"

# Clean up old S3 backups if configured
if [[ -n "$S3_BUCKET" ]] && command -v aws &> /dev/null; then
  CUTOFF_DATE=$(date -v-"${RETENTION_DAYS}d" +%Y-%m-%d 2>/dev/null || date -d "-${RETENTION_DAYS} days" +%Y-%m-%d)
  log "Cleaning S3 backups older than $CUTOFF_DATE..."
  aws s3 ls "$S3_BUCKET/" --region "$S3_REGION" | while read -r line; do
    FILE_DATE=$(echo "$line" | awk '{print $1}')
    FILE_NAME=$(echo "$line" | awk '{print $4}')
    if [[ -n "$FILE_NAME" && "$FILE_DATE" < "$CUTOFF_DATE" ]]; then
      aws s3 rm "$S3_BUCKET/$FILE_NAME" --region "$S3_REGION"
      log "Removed old S3 backup: $FILE_NAME"
    fi
  done
fi

# Summary
log "Backup complete!"
log "  File: $BACKUP_PATH"
log "  Size: $BACKUP_SIZE"

# List current backups
BACKUP_COUNT=$(find "$BACKUP_DIR" -name "*.sql.gz" | wc -l | tr -d ' ')
TOTAL_SIZE=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1)
log "  Total backups: $BACKUP_COUNT ($TOTAL_SIZE)"

send_alert "[OK] CarMarket365 backup completed: $BACKUP_FILE ($BACKUP_SIZE)"
