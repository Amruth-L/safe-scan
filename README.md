# SafeScan

SafeScan is split into two TypeScript projects:

- `frontend`: Vite + React
- `backend`: Express

## Run locally

Open two terminals from this directory.

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies `/api` requests to the
backend at `http://localhost:3000`.

## Production builds

Run `npm run build` inside each project.
