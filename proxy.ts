import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

  if (!token && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  console.log("Middleware triggered:", request.nextUrl.pathname);

  try {
    const { payload } = await jwtVerify(token!, secret);

    const userId = (payload as { id: string }).id;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", userId);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/my-courses",
    "/createcourse",
    "/api/course/createCourse",
    "/api/mycourses",
    "/admin/dashboard",
    "/teacherProfile",
    "/profile",
    "/courseplay",
    "/api/instructor/student",
    "/student",
    "/api/course/enroll",
    "/courses",
    "/api/admin/usermanage",
    "/admin/usermanage",
    "/api/notification",
    "/notif",
    "/api/users/changepassword",
    "/api/execute",
  ],
};
