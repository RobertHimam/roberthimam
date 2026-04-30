"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Upload, Save, Eye, Edit3, Trash2, Globe, Lock } from "lucide-react";
import { clsx } from "clsx";

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: boolean;
}

interface BlogEditorProps {
  initialData?: BlogPost;
  mode: "create" | "edit";
}

export default function BlogEditor({ initialData, mode }: BlogEditorProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost>(
    initialData || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image: "",
      published: false,
    }
  );
  const [isPreview, setIsPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "create" && post.title && !post.slug) {
      setPost((prev) => ({
        ...prev,
        slug: prev.title
          .toLowerCase()
          .replace(/[^\w ]+/g, "")
          .replace(/ +/g, "-"),
      }));
    }
  }, [post.title, mode]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const { url } = await res.json();
      setPost((prev) => ({ ...prev, cover_image: url }));
    } catch (err) {
      setError("Failed to upload image. Make sure the storage bucket exists.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");

    try {
      const url = mode === "create" ? "/api/blog" : `/api/blog/${post.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (!res.ok) throw new Error("Failed to save post");

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError("Failed to save post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {mode === "create" ? "Create New Post" : "Edit Post"}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isPreview ? <Edit3 size={18} /> : <Eye size={18} />}
            {isPreview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {isPreview ? (
            <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl border min-h-[600px]">
              <h1>{post.title}</h1>
              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded-lg mb-8"
                />
              )}
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  placeholder="Post title..."
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Content (Markdown)</label>
                <textarea
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  placeholder="Write your story..."
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none min-h-[500px] font-mono text-sm"
                />
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Slug</label>
              <input
                type="text"
                value={post.slug}
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Excerpt</label>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Cover Image</label>
              {post.cover_image && (
                <div className="relative group rounded-lg overflow-hidden border mb-2">
                  <img src={post.cover_image} alt="Cover" className="w-full aspect-video object-cover" />
                  <button
                    onClick={() => setPost({ ...post, cover_image: "" })}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
              <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">
                    {isUploading ? "Uploading..." : "Click to upload"}
                  </p>
                </div>
                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2">
                {post.published ? (
                  <Globe size={18} className="text-green-600" />
                ) : (
                  <Lock size={18} className="text-gray-400" />
                )}
                <span className="text-sm font-medium">Status</span>
              </div>
              <button
                onClick={() => setPost({ ...post, published: !post.published })}
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-bold transition-colors",
                  post.published ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                )}
              >
                {post.published ? "PUBLISHED" : "DRAFT"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
