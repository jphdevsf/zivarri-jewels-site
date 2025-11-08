export const toAbsoluteStrapiUrl = (url?: string): string | undefined => {
  if (!url) return undefined
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const domain = (process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.NEXT_PUBLIC_CMS_URL ||
    process.env.STRAPI_URL ||
    'http://strapi-dev:1337').replace(/\/$/, '')
  return `${domain}${url}`
}
