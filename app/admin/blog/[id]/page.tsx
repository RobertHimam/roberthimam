"use client";

import { useEffect, useState } from "react";
import BlogEditor from "@/components/blog/BlogEditor";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${params.id}?admin=true`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <p className="text-red-500 font-medium">{error}</p>
        <Link href="/admin/blog" className="text-blue-600 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Dashboard
        </Link>
        <BlogEditor mode="edit" initialData={post} />
      </div>
    </div>
  );
}
