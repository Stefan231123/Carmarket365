# CarMarket365 — Security Status & Action Plan

_Last updated 2026-07-21. Supersedes the earlier draft, which incorrectly treated `Carmarket365/server/` as the live backend._

## Repo map (read this first)

| Repo | Role | Image pipeline | Auth |
|---|---|---|---|
| **`carmarket365-backend`** | ✅ **THE production backend.** Serves the website *and* both mobile apps. Deployed at `carmarket365-production.up.railway.app/graphql` | AWS S3 (presigned URLs) | JWT Bearer (no cookies) |
| **`carmarket365-mobile`** | Expo/React Native apps | S3 via backend presigned URLs | Bearer token in `expo-secure-store` |
| **`Carmarket365`** (this repo) | Web frontend (`client/`) + **legacy `server/` backend** | Cloudinary (direct unsigned upload) | — |

⚠️ **`Carmarket365/server/` is legacy and not the live API.** Do backend work in `carmarket365-backend`.

## The two image pipelines (not a bug — by design)

`CreateCarImageInput` in the live backend accepts **both** `s3Key` and `url`/`publicId`:

- **Web** uploads directly to Cloudinary using an *unsigned* preset (no backend route involved), then saves `url` + `publicId`.
- **Mobile** requests an S3 presigned URL (`getImageUploadUrl`), PUTs to S3, then saves `s3Key`.

Both work today. This is why the web client is Cloudinary-only while the backend is S3-only.

---

## ✅ Fixed (uncommitted — still needs commit + deploy)

**`carmarket365-backend`** — build verified (`npm run build`, exit 0):
- `getExpressSaleOpportunities` was **fully public**, returning quick-sale listings with seller data. Now `@Roles(DEALER, ADMIN)`.
- `isFeatured` mass assignment removed from `CreateCarInput` (and `UpdateCarInput`, which extends it) — sellers could self-promote listings to featured.

**`carmarket365-mobile`** — typecheck 8 errors → 0:
- Fixed a **runtime crash**: `COMMON_FEATURES`/`COMMON_SAFETY` were imported but never existed → `undefined.map()` on the post-car and edit-listing screens. Defined from the i18n keys (verified parity across en/mk/sq).
- `s3-upload.ts`: removed `as any` casts, added proper response types and null/HTTP-status checks.
- Corrected stale docs (wrong backend URL; Cloudinary → S3).

## ⚠️ Open items

1. **Nothing is committed or deployed.** All fixes sit in working trees.
2. **`isFeatured` now has no setter.** Removing it from the DTOs left no application path to feature a listing (there was never an admin mutation). Add an admin-only mutation if featured listings are used.
3. **Web Cloudinary uploads are unsigned** — anyone can upload to your Cloudinary account using the public preset in the JS bundle. The clean fix is to migrate the web client to the S3 presigned flow the backend *already supports*, then drop Cloudinary entirely. Not done — it's a real feature migration needing browser testing.
4. **JWT lives in client JS on web.** The backend is Bearer-only (correct for mobile). Options: add httpOnly-cookie support for web, or shorten token lifetime + add rotation/revocation.
5. **Legacy `Carmarket365/server/`** (89 tracked files) is dead code, BUT `nixpacks.toml`/`railway.json` in this repo still build and start it. **Confirm no Railway service deploys this repo before deleting** — removal must also clean the `build:backend`/`start`/`start:backend`/`typecheck:backend` scripts in `package.json` and the `server/**/*` entry in `tsconfig.json`.
6. **Mobile `npm install` fails** without `--legacy-peer-deps` (`@apollo/client@4` vs `expo-router`'s `react-dom`). A fresh clone can't install.
7. ~15 remaining `any` casts in mobile (`AuthContext.tsx`, `my-listings.tsx`, `useSaveCar.ts`) — best solved with GraphQL codegen rather than hand-written interfaces.

## Verified healthy (live backend)

Ownership checks on car/inquiry mutations; server-side Google token verification; bcrypt passwords; random + bcrypt-hashed refresh tokens; `password`/`refreshToken` excluded from GraphQL; admin queries role-guarded; parameterized queries (no SQL injection); CORS allowlist; S3 presigned uploads. Mobile: SecureStore tokens, no secrets committed, no WebView/eval, near-zero logging.
