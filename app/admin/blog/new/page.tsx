"use client";

import BlogEditor from "@/components/blog/BlogEditor";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewBlogPostPage() {
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
        <BlogEditor mode="create" />
      </div>
    </div>
  );
}
