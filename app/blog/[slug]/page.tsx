import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 3600;

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return data;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-12 transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="space-y-6 mb-12">
            <div className="text-sm text-gray-500 font-medium">
              {format(new Date(post.published_at), "MMMM d, yyyy")}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          </div>

          {post.cover_image && (
            <div className="aspect-[21/9] rounded-3xl overflow-hidden border bg-gray-100 mb-16">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full"
              />
            </div>
          )}

          <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-a:text-black prose-img:rounded-3xl">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
