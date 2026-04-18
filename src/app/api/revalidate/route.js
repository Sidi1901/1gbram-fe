import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const { path, type } = await request.json();

  if (!path) {
    return NextResponse.json({ message: "Missing path" }, { status: 400 });
  }

  revalidatePath(path, type ?? undefined);
  return NextResponse.json({ revalidated: true, path, type });
}
