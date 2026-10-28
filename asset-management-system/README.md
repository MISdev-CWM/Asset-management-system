# AssetTrack

Asset management system (TanStack Start + MongoDB).

## Prerequisites

- Node.js 20+
- MongoDB running locally (default `mongodb://127.0.0.1:27017`)

## Environment

Copy `.env.example` to `.env` and adjust:

```
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB_NAME=asset_management
BOOTSTRAP_SECRET=change-me-to-a-long-random-string
NODE_ENV=development
```

## Install & run (Windows)

```powershell
npm install
npm run dev
```

Open http://localhost:8080

## Initialize first administrator

There is no public registration endpoint. Create the first admin once:

```powershell
$body = @{ secret='change-me-to-a-long-random-string'; username='admin'; email='admin@example.com'; password='password123' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/bootstrap' -Method POST -Body $body -ContentType 'application/json'
```

After users exist, bootstrap is disabled.

## API

Auth:
- POST /api/auth/login  body: { "identifier": "admin", "password": "..." } -> { "user": {...} } + Set-Cookie
- POST /api/auth/logout -> { "ok": true }
- GET /api/auth/me -> { "user": {...} } or 401

Assets:
- GET /api/assets?q=&page=&limit= -> { assets, total, page, limit, totalPages }
- POST /api/assets body: { assetNo?, name, type, department, serialNumber, imei1?, imei2?, price, purchaseDate }
- GET /api/assets/:id -> asset with handovers/returns
- PATCH /api/assets/:id body: partial asset fields
- DELETE /api/assets/:id -> { ok: true } (blocked if history exists)

Handovers:
- GET /api/assets/:id/handovers -> { handovers: [...] }
- POST /api/assets/:id/handovers body: { date, personName, employeeId }

Returns:
- GET /api/assets/:id/returns -> { returns: [...] }
- POST /api/assets/:id/returns body: { date, reason, collectedByName, collectedById }

## Notes

- Passwords are bcrypt-hashed.
- Sessions are HTTP-only cookies (opaque token hashed in DB).
- Assets with handover/return history cannot be deleted (soft delete otherwise).
