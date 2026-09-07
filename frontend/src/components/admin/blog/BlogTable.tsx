import { useState } from "react";
import { Pencil, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { useAllBlogPostsAdmin, useDeleteBlogPost } from "../../../hooks/useBlog";
import type { BlogPost } from "../../../api/blog.api";
import BlogForm from "./BlogForm";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const BlogTable = () => {
  const { data: posts, isLoading, isError } = useAllBlogPostsAdmin();
  const { mutate: deletePost, isPending: isDeleting } = useDeleteBlogPost();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deletePost(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold">Blog</h1>
          <p className="text-gray-500 text-sm mt-1">Write and manage health articles.</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors w-fit"
        >
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      {isLoading && <p className="text-gray-500 text-sm">Loading articles...</p>}
      {isError && <p className="text-red-400 text-sm">Couldn't load articles right now.</p>}
      {posts && posts.length === 0 && (
        <p className="text-gray-500 text-sm">No articles yet.</p>
      )}

      {posts && posts.length > 0 && (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full sm:w-24 h-32 sm:h-16 rounded-lg object-cover shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white font-medium truncate">{post.title}</p>
                  <span
                    className={`shrink-0 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      post.isPublished
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {post.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-gray-500 text-xs">
                  {post.author} · {formatDate(post.publishDate)}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setEditingPost(post)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Edit"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget(post)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(isCreating || editingPost) && (
        <BlogForm
          post={editingPost}
          onClose={() => {
            setIsCreating(false);
            setEditingPost(null);
          }}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-sm p-6">
            <h3 className="text-white font-bold mb-2">Delete Article</h3>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to delete <span className="text-white">{deleteTarget.title}</span>?
              This can't be undone.
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium py-2.5 rounded-full transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} disabled={isDeleting} className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2.5 rounded-full transition-colors disabled:opacity-50">
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogTable;