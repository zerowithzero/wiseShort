import { supabase } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { data, error } = await supabase
      .from("urls")
      .select("id, long_url, short_code, click_count, created_at")
      .order("created_at", { ascending: false });

    if (error)
      return NextResponse.json(
        { error: "Database error +".concat(error.message) },
        { status: 500 }
      );

    // Transform data for DataGrid
    const transformedData = data.map((item) => ({
      id: item.id,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${item.short_code}`,
      longUrl: item.long_url,
      clickCount: item.click_count,
      createdAt: new Date(item.created_at).toLocaleString(),
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
