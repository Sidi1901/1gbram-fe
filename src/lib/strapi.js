const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337/api'

export const STRAPI_MEDIA_URL = STRAPI_URL.replace(/\/api$/, '')

/**
 * Server-side fetch for SSG/SSR. Use this in Server Components or generateStaticParams.
 * Set revalidate to a number (seconds) for ISR, or false for fully static.
 */
export async function fetchStrapi(path, { revalidate = false, timeout = 5000, ...fetchOptions } = {}) {
  const url = `${STRAPI_URL}${path}`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.STRAPI_API_TOKEN && {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      }),
    },
    next: { revalidate },
    signal: AbortSignal.timeout(timeout),
    ...fetchOptions,
  })

  if (!res.ok) throw new Error(`Strapi fetch failed: ${res.status} ${path}`)
  return res.json()
}
