import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    // Redirect to the home page if the user is not authenticated
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/properties/add",
    "/profile",
    "/properties/saved",
    "/messages",
    "/notifications",
    "/conversations",
    "/conversations/:path*",
  ],
};
