import Link from "next/link";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";

interface BlogCardProps {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    cover_image?: string;
    published_at: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block space-y-4 hover:opacity-90 transition-opacity"
    >
      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100 border relative">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            No Image
          </div>
        )}
        <div className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
          <ArrowUpRight size={20} className="text-black" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-500 font-medium">
          {format(new Date(post.published_at), "MMMM d, yyyy")}
        </div>
        <h3 className="text-xl font-bold leading-tight group-hover:text-black/70 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
