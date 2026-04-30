import { NextResponse } from "next/server";
import { supabase, getSupabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/session";

// GET /api/blog/[id] - Fetch single post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get("admin") === "true";

  const session = await getSession();

  if (isAdmin && !session.isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // If ID is not a UUID, treat it as a slug
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  const column = isUuid ? "id" : "slug";

  let query = supabase.from("blog_posts").select("*").eq(column, id).single();

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  // If post is not published and user is not admin, hide it
  if (!data.published && !session.isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(data);
}

// PUT /api/blog/[id] - Update post
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const admin = getSupabaseAdmin();

    // Handle published_at logic
    const updateData = { ...body };
    if (body.published === true && !body.published_at) {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await admin
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
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

// DELETE /api/blog/[id] - Delete post
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const admin = getSupabaseAdmin();

  const { error } = await admin.from("blog_posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Post deleted successfully" });
}
