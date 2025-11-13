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

### ❌ Container Name Conflict Error
If you see an error like:
```bash
Error response from daemon: Conflict. The container name "/zivarri-jewels-site-strapi-dev-1" is already in use by container "2a82c368569d22089201a779c67ed84b8799ff970b907dd6bf608ef22e7e9c68". You have to remove (or rename) that container to be able to reuse that name.
```
This means a container from a previous run wasn't properly cleaned up and is still present.

### ✅ Fix: Remove the conflicting container

1. Stop and remove all containers:
   ```bash
   docker-compose down
   ```

2. Check for remaining containers:
   ```bash
   docker ps -a
   ```

3. Remove the specific conflicting container (replace with actual name if different):
   ```bash
   docker rm zivarri-jewels-site-strapi-dev-1
   ```

4. Restart the stack:
   ```bash
   docker-compose --profile dev up
   ```

## 🧩 Adding New Strapi Components

When adding new components to Strapi (especially for dynamic zones), follow these steps to ensure they appear correctly in the frontend:

### In Strapi...
#### 1. Create Component in Strapi CMS

1. Navigate to **Strapi Admin** → **Content-Type Builder** → **Components**
2. Create your new component (e.g., `content.hero`)
3. Define the component's fields and structure

#### 2. Add Component to Dynamic Zone

1. Go to the content type that uses dynamic zones (e.g., **Page** collection type)
2. Edit the dynamic zone field (e.g., `banners`)
3. Add your new component to the available components list
4. Save and restart the CMS container if needed

### In Repo Codebase...
#### 3. Update Frontend Query Configuration

**Critical**: Update `frontend/src/lib/cms/config/queries.ts` to include your new component in the `dynamicZoneQuery` object:

```typescript
export const dynamicZoneQuery = {
  // ... existing components
  'content.your-new-component': {
    fields: ['field1', 'field2'], // Specify fields to fetch
    populate: {
      nestedComponent: dZLockup, // Reuse existing populate configs
      image: dZImage
    }
  },
}
```

**Why this is needed**: Strapi only returns data for components explicitly defined in your query configuration. Without this step, your component data won't appear in API responses even if it's saved in the CMS.

#### 4. Add Component to PageRenderer

Update `frontend/src/components/PageRenderer.tsx`:

1. Import your component:
   ```typescript
   import YourComponent from './content/YourComponent'
   ```

2. Add to the component map:
   ```typescript
   const componentMap = {
     // ... existing components
     'content.your-new-component': YourComponent,
   }
   ```

3. Add the TypeScript type:
   ```typescript
   import { YourComponentBanner, type Banner } from '@/types/content'
   
   interface componentMapType {
     // ... existing types
     'content.your-new-component': React.ComponentType<YourComponentBanner>;
   }
   ```

#### 5. Create TypeScript Types (if needed)

Add type definitions to `frontend/src/types/content.ts`:

```typescript
export interface YourComponentBanner extends Banner {
  __component: 'content.your-new-component';
  // Add your component's fields here
  title: string;
  subtitle?: string;
  // ... other fields
}
```

#### 6. Create React Component

Create the actual component file at `frontend/src/components/content/YourComponent.tsx`:

```typescriptin
import React from 'react'
import type { YourComponentBanner } from '@/types/content'

interface YourComponentProps extends YourComponentBanner {}

const YourComponent: React.FC<YourComponentProps> = (props) => {
  const { title, subtitle } = props
  
  return (
    <div className="your-component-styles">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {/* Render your component content */}
    </div>
  )
}

export default YourComponent
```

### 7. Test the Integration

1. **In Strapi**: Create content using your new component and publish it
2. **In Frontend**: Check the browser console for the component data in the `banners` array
3. **Verify**: The component should render correctly on the frontend

### Quick Reference: Component Naming

- **Strapi Component Name**: `content.hero` (used in `__component` field)
- **File System**: `Hero.tsx` (PascalCase)
- **TypeScript Interface**: `HeroBanner` (ComponentName + Banner)
- **Query Key**: `'content.hero'` (matches `__component` value)

### Common Issues

- **Component not appearing**: Missing entry in `dynamicZoneQuery`
- **TypeScript errors**: Missing type definitions or component not imported
- **Data not showing**: Component not added to dynamic zone in Strapi content type
- **Styling issues**: Component not matching expected CSS classes

### Example: Adding a "Testimonial" Component

```typescript
// 1. In queries.ts
'testimonial': {
  fields: ['quote', 'author_name', 'author_title'],
  populate: {
    author_image: dZImage
  }
}

// 2. In PageRenderer.tsx
import Testimonial from './content/Testimonial'
const componentMap = {
  // ... existing
  'content.testimonial': Testimonial,
}

// 3. In types/content.ts
export interface TestimonialBanner extends Banner {
  __component: 'content.testimonial';
  quote: string;
  author_name: string;
  author_title?: string;
  author_image: ImageData;
}
```