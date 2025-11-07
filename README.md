# 🛠 Zivarri Jewels Site — Monorepo Stack

This repo is a full-stack website and monorepo powered by Next.js, Strapi, and PostgreSQL, containerized with Docker and orchestrated via Docker Compose. This site is still under development and we're in the content modeling phase (we as in me, myself, and AI).

## 📦 Stack Overview

| Service  | Tech        | Purpose                               |
|----------|-------------|---------------------------------------|
| frontend | Next.js     | Public-facing storefront               |
| cms      | Strapi      | Headless CMS for content & admin       |
| postgres | PostgreSQL  | Persistent data storage                |

## 🚀 Installation

1. Clone the repo

```bash
git clone https://github.com/your-org/zivarri-jewels-site.git
cd zivarri-jewels-site
```

2. Create environment files

```bash
cp cms/.env.example cms/.env
cp frontend/.env.example frontend/.env.local
```

Customize values like database credentials, API URLs, and secrets.

3. Build containers

```bash
docker-compose build
```

**Note**: When installing new packages (e.g., via `npm install` in `frontend/` or `cms/`), rebuild the affected Docker service to update the container's `node_modules`:

```bash
# For frontend changes
docker-compose --profile dev build frontend-dev

# For CMS changes
docker-compose --profile dev build cms-dev

# Then restart
docker-compose --profile dev up
```

## 🧪 Local Development

Start the stack in development mode:

```bash
docker-compose --profile dev up
```

Access:

- Frontend: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin

## 🚀 Production Mode

Start the stack in production mode:

```bash
docker-compose --profile prod up -d
```

This runs optimized builds with no hot reload and compiled assets. Use `--profile prod` to activate production services.

## 🧰 Primary CLI Commands

### Docker Compose (Monorepo)

```bash
docker-compose --profile dev up          # Start dev stack
docker-compose --profile dev down        # Stop dev stack
docker-compose --profile prod up -d      # Start prod stack (detached)
docker-compose --profile prod down       # Stop prod stack
docker-compose --profile dev build       # Build all dev services
docker-compose --profile dev build frontend-dev  # Build specific service
```

### Strapi (CMS)

```bash
npm run develop       # Development mode
npm run build         # Compile admin panel
npm run start         # Production mode
npm run start-dev     # Dev mode with NODE_ENV
npm run start-prod    # Prod mode with NODE_ENV
```

### Next.js (Frontend)

```bash
npm run dev           # Development mode
npm run build         # Compile frontend
npm run start         # Serve compiled frontend
npm run start-dev     # Dev mode with NODE_ENV
npm run start-prod    # Prod mode with NODE_ENV
npm run lint          # Run ESLint
npm run lint:fix      # Run ESLint with auto-fix
```

## 📁 Project Structure

```text
zivarri-jewels-site/
├── cms/               # Strapi backend
├── frontend/          # Next.js frontend
├── docker-compose.yml # Compose orchestration
```

## ✅ What’s Working

- Dockerized monorepo with isolated services
- Native module compatibility across macOS and Linux
- Compose profiles for dev/prod switching
- Persistent PostgreSQL volume
- .dockerignore optimization for fast builds

## 🧯 Troubleshooting

### ❌ Port Already Allocated Error
If you see an error like:
```bash
Bind for 0.0.0.0:1337 failed: port is already allocated
```
This means another container or process is already using port `1337` on your machine — often caused by leftover containers from previous runs.

### ✅ Fix: Clean up orphaned containers

Run this command to stop and remove any orphaned containers:

```bash
docker-compose --profile dev down --remove-orphans
```

### ❌ Module Not Found (e.g., 'qs' or other packages)
If you see "Module not found" errors in the frontend container (e.g., after installing new packages), the container's `node_modules` is out of sync.

### ✅ Fix: Rebuild the affected service

```bash
# Stop containers first
docker-compose --profile dev down

# Rebuild frontend (or cms-dev if CMS packages changed)
docker-compose --profile dev build frontend-dev

# Restart
docker-compose --profile dev up
```

Always rebuild after adding/removing packages in `frontend/package.json` or `cms/package.json`.