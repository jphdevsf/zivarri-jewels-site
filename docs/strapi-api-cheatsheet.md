# Strapi API cheatsheet (project-local)

Purpose: fast reference for fetching CMS data from this repo (Strapi v5, Next.js frontend, Docker Compose).

Repo paths
- CMS (Strapi): `cms/`
- Frontend (Next.js): `frontend/`
- Page schema: `cms/src/api/page/content-types/page/schema.json`
- SEO component schema: `cms/src/components/seo/seo.json`
- Frontend page fetch example: `frontend/src/app/[slug]/page.tsx`
- SEO mapping util: `frontend/src/lib/seo/generateMetadataFromStrapi.ts`

Services and URLs
- Strapi service name (Docker): `strapi-dev` (dev profile)
  - Internal (container-to-container): `http://strapi-dev:1337`
  - Host/browser access: `http://localhost:1337`
- Frontend service: `frontend-dev` on `http://localhost:3000`

Environment variables (frontend/.env.local)
- `NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api` (browser-safe base API URL)
- `NEXT_PUBLIC_CMS_URL=http://localhost:1337` (for building absolute media URLs)
- `CMS_INTERNAL_URL=http://strapi:1337` (used for server-to-server calls if needed)
  - Note: the correct Docker service hostname is `strapi-dev`. Consider updating to `http://strapi-dev:1337` in a future change.

Auth and permissions
- Public access: If collection types are readable by Public role, no token is required.
- Private access: Create an API Token in Strapi Admin → Settings → API Tokens, then send header: `Authorization: Bearer <token>`.
- Users & Permissions plugin is present; adjust Public role if needed.

Content model highlights
- Collection type: `page`
  - fields: `title` (string), `slug` (uid), `published` (boolean), `text` (blocks), `banners` (dynamic zone: content.hero, content.gallery, content.card-list, content.section-header), `seo` (component seo.seo)
- Single type: `global-setting`
  - fields: `siteName`, `companyName`, `logo` (media), `header` (component global.header)
- SEO component: `seo.seo`
  - fields: `metaTitle` (string), `metaDescription` (text), `metaKeywords` (text), `schemaType` (enum), `llmSummary` (blocks), `seoImage` (media)

Endpoints and query patterns
- Pages (filter by slug):
  - GET `/api/pages?filters[slug][$eq]=<slug>&populate=*`
  - Example (about page): `/api/pages?filters[slug][$eq]=about&populate=*`
- Global settings:
  - GET `/api/global-setting?populate=*`

Populate guidance
- `populate=*` pulls all relations but can be heavy. For production consider:
  - `populate[seo]=*`
  - `populate[banners][populate]=*`
  - `fields[0]=title&fields[1]=slug` to limit base fields
- Strapi also supports `populate=deep` but be mindful of performance.

Curl examples
- Public fetch (host):
  - `curl "http://localhost:1337/api/pages?filters%5Bslug%5D%5B%24eq%5D=about&populate=%2A"`
- With API token:
  - `curl -H "Authorization: Bearer $STRAPI_TOKEN" "http://localhost:1337/api/global-setting?populate=%2A"`
- Pretty-print (jq):
  - macOS install: `brew install jq`
  - usage: `... | jq .`

Next.js fetch patterns (server components)
- Current pattern (see `frontend/src/app/[slug]/page.tsx`):
  - `await fetch("http://strapi-dev:1337/api/pages?...&populate=*")`
- Recommended consolidation (future):
  - Use env-based base URL: server-side use internal when available, fallback to public
  - Add caching/revalidation as needed

Example utility (future idea)
```ts
// frontend/src/lib/strapi.ts
const PUBLIC_API = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337/api";
const INTERNAL_URL = process.env.CMS_INTERNAL_URL ?? "http://strapi-dev:1337"; // server-only

export const strapiApi = (path: string, init?: RequestInit) => {
  const isServer = typeof window === "undefined";
  const base = isServer ? `${INTERNAL_URL}/api` : PUBLIC_API;
  return fetch(`${base}${path}`, {
    // example cache: revalidate every 60s
    next: { revalidate: 60 },
    ...init,
  });
};
```

Media URLs
- Strapi may return relative media URLs. Use `NEXT_PUBLIC_CMS_URL` to build absolute URLs in the frontend: `new URL(url, process.env.NEXT_PUBLIC_CMS_URL).toString()`.

SEO mapping
- File: `frontend/src/lib/seo/generateMetadataFromStrapi.ts`
- Maps `page.seo` (title/description/keywords/schemaType/seoImage) to Next.js `Metadata`.

Known gaps / TODOs
- Update `CMS_INTERNAL_URL` to `http://strapi-dev:1337` for container-to-container consistency.
- Replace hard-coded hosts in code with env-driven helper.
- Add banner component renderers to frontend for `content.*` dynamic zone (if not already implemented).

Quick test URLs
- Strapi Admin: `http://localhost:1337/admin`
- About page API: `http://localhost:1337/api/pages?filters[slug][$eq]=about&populate=*`
- Global setting API: `http://localhost:1337/api/global-setting?populate=*`

Notes for GitHub Copilot (assistant)
- Prefer `CMS_INTERNAL_URL` for server-side fetches in Next.js when running in Docker.
- If an auth token is provided, include `Authorization: Bearer <token>` header in requests.
- Default to `populate=*` during development; propose selective populate in PRs for performance.
