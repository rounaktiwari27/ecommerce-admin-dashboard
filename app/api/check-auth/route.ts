import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const admin = cookieStore.get("admin");

  return NextResponse.json({
    authenticated: admin?.value === "true",
  });
}