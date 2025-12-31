import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { username, password } = body;

  if (username !== "admin" || password !== "admin123") {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return response;
}