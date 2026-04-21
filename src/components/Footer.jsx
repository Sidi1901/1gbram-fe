import ReactMarkdown from "react-markdown";
import { fetchStrapi } from "@/lib/strapi";

async function getFooter() {
  try {
    // Fetch footer data from Strapi with caching (revalidate every hour)
    const res = await fetchStrapi("/footer?populate=*", { revalidate: 3600 });
    return res?.data?.attributes ?? null;
  } catch {
    return null;
  }
}

export default async function Footer() {
  const footer = await getFooter();

  const navLinks = footer?.footerNav ?? [];
  const copyright =
    footer?.copyright ??
    `${new Date().getFullYear()} 1GBRam.com. All rights reserved.`;
  const disclaimer = footer?.disclaimer ?? "";

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        {navLinks.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-0">
            {navLinks.map(({ id, label, url }, i) => (
              <span key={id} className="flex items-center">
                {i > 0 && (
                  <span className="text-gray-400 mx-3 select-none">|</span>
                )}
                <a
                  href={url}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors no-underline"
                >
                  {label}
                </a>
              </span>
            ))}
          </div>
        )}

        {disclaimer && (
          <div className="text-xs text-gray-500 leading-relaxed mx-auto prose prose-xs max-w-none">
            <ReactMarkdown>{disclaimer}</ReactMarkdown>
          </div>
        )}

        <p className="text-xs text-gray-500">&copy; {copyright}</p>
      </div>
    </footer>
  );
}
