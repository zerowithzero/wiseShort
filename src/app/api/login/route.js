import { supabase } from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  // Basic email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  // Basic password validation (minimum 6 characters)
  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  try {
    // Log in the user with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    await supabase.auth.refreshSession();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // The session will automatically be managed by Supabase.
    // You can also store the session in a secure cookie if needed:
    // - Optionally, create a session cookie here using JWT
    // Return the JWT token and user data
    const token = data.session?.access_token;
    if (!token) {
      return NextResponse.json(
        { error: "No access token found" },
        { status: 400 }
      );
    }
    // Set the token in a cookie
    const response = NextResponse.json({
      session: data.session,
      user: data.user,
      token,
    });
    // Set the token in a secure, HTTP-only cookie
    response.cookies.set("supabase_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Make sure this is only sent in secure environments
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
