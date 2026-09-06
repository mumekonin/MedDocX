import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "../api/blog.api";

export const useBlogPosts = () =>
  useQuery({ queryKey: ["blog"], queryFn: getBlogPosts });