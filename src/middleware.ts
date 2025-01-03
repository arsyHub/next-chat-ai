import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware untuk memeriksa API key
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Berlaku hanya untuk route API tertentu
  if (pathname.startsWith("/api")) {
    const apiKey = request.headers.get("x-api-key");

    // Validasi API key
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid API Key" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next(); // Lanjutkan ke route yang diminta
}

// Konfigurasi matcher untuk menentukan route mana yang terkena middleware
export const config = {
  matcher: ["/api/:path*"], // Middleware hanya untuk semua route di /api
};
