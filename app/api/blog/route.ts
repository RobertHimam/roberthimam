import { NextResponse } from "next/server";
import { supabase, getSupabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/session";

// GET /api/blog - Fetch posts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeUnpublished = searchParams.get("admin") === "true";

  const session = await getSession();
  
  // If requesting unpublished posts, must be admin
  if (includeUnpublished && !session.isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (!includeUnpublished) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/blog - Create post
export async function POST(request: Request) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const admin = getSupabaseAdmin();

    const { data, error } = await admin
      .from("blog_posts")
      .insert([
        {
          ...body,
          published_at: body.published ? new Date().toISOString() : null,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
