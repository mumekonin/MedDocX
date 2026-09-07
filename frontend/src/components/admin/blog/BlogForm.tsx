import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { blogSchema, type BlogFormValues } from "../../../schemas/blog.schema";
import { useCreateBlogPost, useUpdateBlogPost } from "../../../hooks/useBlog";
import type { BlogPost } from "../../../api/blog.api";

interface BlogFormProps {
  post: BlogPost | null;
  onClose: () => void;
}

const toDateInputValue = (isoString: string) => isoString.split("T")[0];

const BlogForm = ({ post, onClose }: BlogFormProps) => {
  const isEditing = !!post;
  const { mutate: create, isPending: isCreating, isError: createError } = useCreateBlogPost();
  const { mutate: update, isPending: isUpdating, isError: updateError } = useUpdateBlogPost();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: post?.title ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      author: post?.author ?? "",
      publishDate: post ? toDateInputValue(post.publishDate) : "",
      isPublished: post?.isPublished ?? false,
    },
  });

  useEffect(() => {
    reset({
      title: post?.title ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      author: post?.author ?? "",
      publishDate: post ? toDateInputValue(post.publishDate) : "",
      isPublished: post?.isPublished ?? false,
    });
  }, [post, reset]);

  const isPending = isCreating || isUpdating;
  const isError = createError || updateError;

  const onSubmit = (values: BlogFormValues) => {
    if (isEditing) {
      update({ id: post.id, input: values }, { onSuccess: onClose });
    } else {
      create(values, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-7">
          <h3 className="text-white font-bold text-lg mb-6">
            {isEditing ? "Edit Article" : "Write New Article"}
          </h3>

          {isError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-4">
              Something went wrong. Please check the form and try again.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Title</label>
              <input
                {...register("title")}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
                placeholder="Heart Health Made Simple"
              />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
              {isEditing && (
                <p className="text-gray-600 text-xs mt-1">
                  Current URL: /blog/{post.slug} — changing the title updates this automatically.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Author</label>
                <input
                  {...register("author")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
                  placeholder="Dr. Ethan Williams"
                />
                {errors.author && <p className="text-red-400 text-xs mt-1">{errors.author.message}</p>}
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Publish Date</label>
                <input
                  type="date"
                  {...register("publishDate")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                />
                {errors.publishDate && (
                  <p className="text-red-400 text-xs mt-1">{errors.publishDate.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Excerpt</label>
              <textarea
                {...register("excerpt")}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 resize-none"
                placeholder="Short summary shown on blog cards"
              />
              {errors.excerpt && <p className="text-red-400 text-xs mt-1">{errors.excerpt.message}</p>}
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Content</label>
              <textarea
                {...register("content")}
                rows={8}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 resize-none"
                placeholder="Full article body..."
              />
              {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>}
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">
                Cover Image {isEditing ? "(leave empty to keep current)" : ""}
              </label>
              {isEditing && post.coverImageUrl && (
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-32 rounded-lg object-cover mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                {...register("coverImage")}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-500/10 file:text-indigo-400 file:text-sm hover:file:bg-indigo-500/20 file:cursor-pointer cursor-pointer"
              />
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                {...register("isPublished")}
                className="w-4 h-4 rounded accent-indigo-500"
              />
              <span className="text-gray-300 text-sm">
                Published (visible on public site)
              </span>
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 rounded-full transition-colors disabled:opacity-50"
            >
              {isPending ? "Saving..." : isEditing ? "Save Changes" : "Create Article"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;