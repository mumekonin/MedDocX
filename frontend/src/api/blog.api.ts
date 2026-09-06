import axiosClient from "./axiosClient";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  author: string;
  publishDate: string;
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data } = await axiosClient.get("/blog");
  return data;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const { data } = await axiosClient.get(`/blog/slug/${slug}`);
  return data;
};