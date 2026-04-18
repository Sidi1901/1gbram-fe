import { fetchStrapi, STRAPI_MEDIA_URL } from "@/lib/strapi";
import NavbarClient from "./NavbarClient";

async function getHeader() {
  try {
    const res = await fetchStrapi("/header?populate=*", { revalidate: 3600 });
    return res?.data?.attributes ?? null;
  } catch {
    return null;
  }
}

export default async function Navbar() {
  const header = await getHeader();

  const navLinks = header?.navLink ?? [];

  const logoAttr = header?.logo?.data?.attributes;
  const logo = logoAttr
    ? {
        url: `${STRAPI_MEDIA_URL}${logoAttr.formats?.small?.url ?? logoAttr.url}`,
        alt: logoAttr.alternativeText ?? "Logo",
        width: logoAttr.formats?.small?.width ?? logoAttr.width,
        height: logoAttr.formats?.small?.height ?? logoAttr.height,
      }
    : null;

  return <NavbarClient navLinks={navLinks} logo={logo} />;
}
