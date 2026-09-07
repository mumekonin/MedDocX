import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  author: z.string().min(2, "Author name is required"),
  publishDate: z.string().min(1, "Please select a publish date"),
  isPublished: z.boolean().optional(),
  coverImage: z.instanceof(FileList).optional(),
});

export type BlogFormValues = z.infer<typeof blogSchema>;