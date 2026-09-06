import { useQuery } from "@tanstack/react-query";
import { getBlogPosts, getBlogPostBySlug } from "../api/blog.api";

export const useBlogPosts = () =>
  useQuery({ queryKey: ["blog"], queryFn: getBlogPosts });

export const useBlogPostBySlug = (slug: string) =>
  useQuery({
    queryKey: ["blog", "slug", slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug,
  });