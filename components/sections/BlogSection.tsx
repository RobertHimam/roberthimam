import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase";
import BlogCard from "@/components/blog/BlogCard";

async function getLatestPosts() {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("[BlogSection] Error fetching posts:", JSON.stringify(error));
    return [];
  }

  return data ?? [];
}

export async function BlogSection() {
  const posts = await getLatestPosts();

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-14 border-b border-stone-200">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-[10px] font-medium tracking-[0.18em] uppercase text-stone-400">
            Writing
          </h2>
          <Link
            href="/blog"
            className="font-mono text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
          >
            All posts →
          </Link>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
