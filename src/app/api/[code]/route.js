import { redis } from "../../../lib/redis";
import { supabase } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { code } = await params;
  const shortCode = code;
  if (!/^[a-zA-Z0-9_-]{4,10}$/.test(shortCode))
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });

  try {
    let longUrl = await redis.get(shortCode);

    if (!longUrl) {
      const { data, error } = await supabase
        .from("urls")
        .select("long_url")
        .eq("short_code", shortCode)
        .single();
      if (error || !data)
        return NextResponse.json(
          { error: "Short URL not found" },
          { status: 404 }
        );

      longUrl = data.long_url;
      await redis.set(shortCode, longUrl, "EX", 3600);
    }

    // ✅ Corrected: Use `increment()` instead of `raw()`
    await supabase.rpc("increment_click_count", { shortcode: shortCode });
    return NextResponse.redirect(longUrl);
  } catch (error) {
    return NextResponse.json(
      { error: "Database error +".concat(error.message) },
      { status: 500 }
    );
  }
}
