import { getSupabaseAdmin } from "@/lib/supabase";
import BlogCard from "@/components/blog/BlogCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const revalidate = 3600;

async function getPosts() {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[blog] Error fetching posts:", JSON.stringify(error));
    return [];
  }

  console.log(`[blog] Fetched ${data?.length ?? 0} posts`);
  return data ?? [];
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-20">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl space-y-4 mb-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Writing & Thoughts</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              My insights on design and engineering.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="py-20 text-center border rounded-3xl bg-gray-50">
              <p className="text-gray-500">No blog posts found. Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
