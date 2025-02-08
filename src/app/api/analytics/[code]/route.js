import { supabase } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { shortCode } = params;
  if (!/^[a-zA-Z0-9_-]{4,10}$/.test(shortCode))
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });

  try {
    const { data, error } = await supabase
      .from("urls")
      .select("click_count")
      .eq("short_code", shortCode)
      .single();
    if (error || !data)
      return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return NextResponse.json({ clicks: data.click_count });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
