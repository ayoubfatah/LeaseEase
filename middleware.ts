import { auth } from "@/auth";
import { NextResponse } from "next/server"; // Import NextResponse

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // If the user is not authenticated and tries to access the /properties/add page, redirect them
  if (
    (!req.auth?.user && pathname === "/properties/add") ||
    pathname === "/messages" ||
    pathname === "/profile" ||
    pathname === "/properties/saved"
  ) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to login page
  }

  // If authenticated or accessing other paths, allow the request
  return NextResponse.next();
});

// Middleware configuration to apply it only to relevant paths
export const config = {
  matcher: [
    "/properties/add",
    "/messages",
    "/profile",
    "/properties/saved",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
