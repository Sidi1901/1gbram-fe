const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337/api";
const BE_DOMAIN = process.env.NEXT_PUBLIC_BE_DOMAIN || "http://localhost:8080";

export const STRAPI_MEDIA_URL = STRAPI_URL.replace(/\/api$/, "");

/**
 * Server-side fetch for SSG/SSR. Use this in Server Components or generateStaticParams.
 * Set revalidate to a number (seconds) for ISR, or false for fully static.
 */
export async function fetchStrapi(
  path,
  { revalidate = false, timeout = 5000, ...fetchOptions } = {},
) {
  const url = `${STRAPI_URL}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(process.env.STRAPI_API_TOKEN && {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      }),
    },
    next: { revalidate },
    // signal: AbortSignal.timeout(timeout),
    ...fetchOptions,
  });

  if (!res.ok) throw new Error(`Strapi fetch failed: ${res.status} ${path}`);
  return res.json();
}

export async function fetchGoBe(
  path,
  { timeout = 15000, ...fetchOptions } = {},
) {
  const url = `${BE_DOMAIN}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    // signal: AbortSignal.timeout(timeout),
    ...fetchOptions,
  });

  if (!res.ok) {
    let body = {};
    try {
      body = await res.json();
    } catch {}
    const err = new Error(
      body.error ?? `GoBe fetch failed: ${res.status} ${path}`,
    );
    err.data = body;
    throw err;
  }
  return res.json();
}
