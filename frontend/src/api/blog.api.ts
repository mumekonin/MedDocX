import axiosClient from "./axiosClient";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  publishDate: string;
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data } = await axiosClient.get("/blog");
  return data;
};