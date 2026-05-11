import NavbarClient from "./NavbarClient";

const NAV_LINKS = [
  {
    id: 1,
    label: "Blogs",
    url: `${process.env.NEXT_PUBLIC_ROOT_PAGE_URL}/`,
  },
  { id: 2, label: "Checker", url: `/checker` },
  {
    id: 3,
    label: "About",
    url: `${process.env.NEXT_PUBLIC_ROOT_PAGE_URL}/about/`,
  },
];

export default function Navbar() {
  return <NavbarClient navLinks={NAV_LINKS} logo={null} />;
}
