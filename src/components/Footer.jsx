const CATEGORIES = [
  {
    label: "GTA5",
    url: `${process.env.NEXT_PUBLIC_ROOT_PAGE_URL}/category/gta5/`,
  },
  {
    label: "Microsoft Applications",
    url: `${process.env.NEXT_PUBLIC_ROOT_PAGE_URL}/category/microsoft-applications/`,
  },
  {
    label: "Other",
    url: `${process.env.NEXT_PUBLIC_ROOT_PAGE_URL}/category/others/`,
  },
];

const LEGAL_LINKS = [
  {
    label: "Privacy Policy",
    url: `${process.env.NEXT_PUBLIC_ROOT_PAGE_URL}/privacy-policy/`,
  },
  {
    label: "Terms & Conditions",
    url: `${process.env.NEXT_PUBLIC_ROOT_PAGE_URL}/terms-conditions/`,
  },
];

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <a
            href={`${process.env.NEXT_PUBLIC_ROOT_PAGE_URL}/`}
            className="text-white text-xl font-bold tracking-tight no-underline hover:opacity-80 transition-opacity"
          >
            1GBRam<span className="text-blue-500">.com</span>
          </a>
          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            Dev insights, tools, and tutorials optimised for developers running
            lean hardware.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h4 className="text-white text-sm font-semibold uppercase tracking-widest">
            Categories
          </h4>
          <ul className="space-y-3 list-none p-0 m-0">
            {CATEGORIES.map(({ label, url }) => (
              <li key={label}>
                <a
                  href={url}
                  className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 no-underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <h4 className="text-white text-sm font-semibold uppercase tracking-widest">
            Legal
          </h4>
          <ul className="space-y-3 list-none p-0 m-0">
            {LEGAL_LINKS.map(({ label, url }) => (
              <li key={label}>
                <a
                  href={url}
                  className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200 no-underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800" />

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="text-gray-400 font-semibold">Disclaimer: </span>
          Information on this website is based on official sources and publicly
          available data, along with occasional estimates or pre-release
          assumptions. While we aim for accuracy, we do not guarantee
          completeness or reliability. Please verify details from official
          sources before making decisions. We are not liable for any losses
          resulting from the use of this information.
        </p>
        <p className="text-xs text-gray-600">
          &copy; {YEAR} 1GBRam.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
