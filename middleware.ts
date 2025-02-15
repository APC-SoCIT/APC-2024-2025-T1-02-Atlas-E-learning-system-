import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userType = request.cookies.get("userType")?.value;

  // Redirect logged-in users away from the login page
  if (userType && pathname === "/") {
    // Redirect students to /student, admins to /admin, and instructors to /instructor
    if (userType === "Student") {
      return NextResponse.redirect(new URL("/student/courses", request.url));
    }
    if (userType === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (userType === "Instructor") {
      return NextResponse.redirect(
        new URL("/instructor/subjects", request.url)
      );
    }
  }

  // Students can only access /student and its sub-routes
  if (userType === "Student") {
    if (!pathname.startsWith("/student")) {
      return NextResponse.redirect(new URL("/student/courses", request.url));
    }
  }

  // Admins can only access /admin and its sub-routes
  if (userType === "Admin") {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Instructors can only access /instructor and its sub-routes
  if (userType === "Instructor") {
    if (!pathname.startsWith("/instructor")) {
      return NextResponse.redirect(
        new URL("/instructor/subjects", request.url)
      );
    }
  }

  // Users who are not logged in can only access the login page
  if (!userType) {
    if (!pathname.startsWith("/login") && pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Define the paths this middleware should run on
export const config = {
  matcher: [
    "/student/:path*",
    "/admin/:path*",
    "/instructor/subjects/:path*",
    "/",
  ],
};
