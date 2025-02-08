import { supabase } from "../../../lib/db";
import { NextResponse } from "next/server";

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
    // Sign up the user with email and password
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Optionally send a verification email
    // await supabase.auth.api.sendVerificationEmail(email);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { error: "Signup failed. Please try again." },
      { status: 500 }
    );
  }
}
