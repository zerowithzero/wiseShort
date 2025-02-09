import { supabase } from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Sign out the user from Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        { error: "Failed to log out. Please try again." },
        { status: 500 }
      );
    }
    const response = NextResponse.json({ message: "Logged out successfully" });
    // Set the token in a secure, HTTP-only cookie
    response.cookies.set("supabase_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Make sure this is only sent in secure environments
      path: "/",
    });
    // req.cookies.clear();
    // Clear any additional cookies if necessary
    // Optionally, you can also manually delete cookies here
    // req.cookies.clear();

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { error: "Logout failed. Please try again." },
      { status: 500 }
    );
  }
}
