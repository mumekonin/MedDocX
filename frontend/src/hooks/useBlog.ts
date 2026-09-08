import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {getBlogPosts, getAllBlogPostsAdmin, getBlogPostBySlug, createBlogPost, updateBlogPost, deleteBlogPost, type BlogFormInput,
} from "../api/blog.api";

export const useBlogPosts = () =>
  useQuery({ queryKey: ["blog"], queryFn: getBlogPosts });

export const useAllBlogPostsAdmin = () =>
  useQuery({ queryKey: ["blog", "admin-all"], queryFn: getAllBlogPostsAdmin });

export const useBlogPostBySlug = (slug: string) =>
  useQuery({
    queryKey: ["blog", "slug", slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug,
  });

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: BlogFormInput) => createBlogPost(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: BlogFormInput }) => updateBlogPost(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
};