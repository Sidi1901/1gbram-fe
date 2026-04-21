"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export default function NavbarClient({ navLinks, logo }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center no-underline">
          {logo ? (
            <Image
              src={logo.url}
              alt={logo.alt}
              width={120}
              height={Math.round(120 * (logo.height / logo.width))}
              priority
              className="object-contain"
            />
          ) : (
            <span className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              1GbRam
            </span>
          )}
        </a>

        {/* Desktop nav */}
        <ul
          className="list-none m-0 p-0 items-center gap-0"
          style={{ display: "flex" }}
          id="desktop-nav"
        >
          {navLinks.map(({ id, label, url }, i) => (
            <li key={id} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && (
                <span style={{ color: "#d1d5db", padding: "0 12px", userSelect: "none" }}>
                  |
                </span>
              )}
              <a
                href={url}
                className={`text-sm font-medium transition-colors hover:text-blue-600 no-underline ${
                  pathname === url ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="text-gray-600 hover:text-gray-900"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }}
          id="hamburger-btn"
          aria-label="Open menu"
        >
          <MenuOutlined style={{ fontSize: 20 }} />
        </button>
      </nav>

      <style>{`
        @media (max-width: 767px) {
          #desktop-nav { display: none !important; }
          #hamburger-btn { display: block !important; }
        }
      `}</style>

      <Drawer
        title="Menu"
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closeIcon={<CloseOutlined />}
        size="default"
      >
        <ul className="list-none m-0 p-0 flex flex-col gap-4">
          {navLinks.map(({ id, label, url }) => (
            <li key={id}>
              <a
                href={url}
                onClick={() => setDrawerOpen(false)}
                className={`block text-base font-medium transition-colors hover:text-blue-600 no-underline ${
                  pathname === url ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Drawer>
    </header>
  );
}
