const BE_DOMAIN = process.env.NEXT_PUBLIC_BE_DOMAIN || "http://localhost:8080";

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
