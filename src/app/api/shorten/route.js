import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "../../../lib/db";
import { redis } from "../../../lib/redis";

const schema = z.object({
  longUrl: z.string().url(),
  customAlias: z.string().optional(),
});

export async function POST(req) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { longUrl, customAlias } = parsed.data;
  const shortCode = customAlias || nanoid(6);

  if (!/^[a-zA-Z0-9_-]{4,10}$/.test(shortCode)) {
    return NextResponse.json(
      { error: "Invalid alias. Use 4-10 alphanumeric characters, -, _." },
      { status: 400 }
    );
  }
  try {
    // Check if the short code already exists
    const { data: existing, error: checkError } = await supabase
      .from("urls")
      .select("id")
      .eq("short_code", shortCode)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Alias already taken" },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { error: insertError } = await supabase
      .from("urls")
      .insert([{ long_url: longUrl, short_code: shortCode, click_count: 0 }]);

    if (insertError) {
      console.error("Supabase Insert Error:", insertError);
      return NextResponse.json(
        { error: "Database insert failed" },
        { status: 500 }
      );
    }
    await redis.set(shortCode, longUrl);

    return NextResponse.json({
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Database error +".concat(err.message) },
      { status: 500 }
    );
  }
}
