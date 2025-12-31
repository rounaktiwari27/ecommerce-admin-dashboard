import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    cloud: process.env.CLOUDINARY_CLOUD_NAME || null,
  });
}
