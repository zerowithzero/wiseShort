import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const token = req.cookies.get("supabase_token");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = createMiddlewareClient({ req, res });

  // Set the JWT token for Supabase client
  const {
    data: { user: session },
    error,
  } = await supabase.auth.getUser(token.value);

  const protectedRoutes = ["/", "/profile", "/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (error || session.aud !== "authenticated") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isProtectedRoute && session.aud !== "authenticated") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/profile", "/dashboard"],
};
