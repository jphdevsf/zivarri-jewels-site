import qs from 'qs'
import type { GetCmsDataFn } from '@/types/CMSResponse'

export const getCmsData: GetCmsDataFn = async (endpoint, queryParams) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.STRAPI_URL ||
    'http://strapi-dev:1337'
  const queryString = qs.stringify(queryParams, { encodeValuesOnly: true })
  const url = `${baseUrl}/api/${endpoint}${queryString ? `?${queryString}` : ''}`

  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) throw new Error(`Failed to fetch from ${url}: ${response.statusText}`)
  const data = await response.json()
  return data
}

