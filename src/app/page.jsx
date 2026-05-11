import { redirect } from "next/navigation";

export default function HomePage() {
  redirect(`${process.env.NEXT_PUBLIC_ROOT_PAGE_URL}/`);
}
