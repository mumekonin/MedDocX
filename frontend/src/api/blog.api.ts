import axiosClient from "./axiosClient";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  author: string;
  isPublished: boolean;
  publishDate: string;
  createdAt: string;
}

export interface BlogFormInput {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  isPublished?: boolean;
  coverImage?: FileList;
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data } = await axiosClient.get("/blog");
  return data;
};

export const getAllBlogPostsAdmin = async (): Promise<BlogPost[]> => {
  const { data } = await axiosClient.get("/blog/all");
  return data;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const { data } = await axiosClient.get(`/blog/slug/${slug}`);
  return data;
};

export const getBlogPostById = async (id: string): Promise<BlogPost> => {
  const { data } = await axiosClient.get(`/blog/${id}`);
  return data;
};

const buildBlogFormData = (input: BlogFormInput): FormData => {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("excerpt", input.excerpt);
  formData.append("content", input.content);
  formData.append("author", input.author);
  formData.append("publishDate", input.publishDate);
  if (input.isPublished !== undefined) formData.append("isPublished", String(input.isPublished));
  if (input.coverImage && input.coverImage.length > 0) {
    formData.append("coverImage", input.coverImage[0]);
  }
  return formData;
};

export const createBlogPost = async (input: BlogFormInput): Promise<BlogPost> => {
  const { data } = await axiosClient.post("/blog", buildBlogFormData(input), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateBlogPost = async (id: string, input: BlogFormInput): Promise<BlogPost> => {
  const { data } = await axiosClient.put(`/blog/${id}`, buildBlogFormData(input), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteBlogPost = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosClient.delete(`/blog/${id}`);
  return data;
};