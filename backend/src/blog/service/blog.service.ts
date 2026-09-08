import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlogPost, BlogPostDocument } from "../schema/blog.schema";
import { UpdateBlogDto ,CreateBlogDto} from "../dto/blog.dto";
import { BlogResponse } from "../response/blog.response";
import { CloudinaryService } from "../../common/cloudinary/service/cloudinary.service";

const BLOG_COVER_FOLDER = "meddocx/blog";

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name)
    private readonly blogModel: Model<BlogPostDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createBlogDto: CreateBlogDto,
    coverImage: Express.Multer.File,
  ): Promise<BlogResponse> {
    if (!coverImage) {
      throw new NotFoundException("cover image is required");
    }

    const slug = await this.generateUniqueSlug(createBlogDto.title);
    const uploadResult = await this.cloudinaryService.uploadImage(coverImage, BLOG_COVER_FOLDER);

    const newPost = new this.blogModel({
      ...createBlogDto,
      slug,
      coverImageUrl: uploadResult.url,
      coverImagePublicId: uploadResult.publicId,
      publishDate: createBlogDto.publishDate ? new Date(createBlogDto.publishDate) : new Date(),
    });
    const savedPost = await newPost.save();

    return this.toResponse(savedPost);
  }

  async findAllPublished(): Promise<BlogResponse[]> {
    const posts = await this.blogModel
      .find({ isPublished: true })
      .sort({ publishDate: -1 });
    return posts.map((post) => this.toResponse(post));
  }

  async findAllForAdmin(): Promise<BlogResponse[]> {
    const posts = await this.blogModel.find().sort({ createdAt: -1 });
    return posts.map((post) => this.toResponse(post));
  }

  async findBySlug(slug: string): Promise<BlogResponse> {
    const post = await this.blogModel.findOne({ slug, isPublished: true });
    if (!post) {
      throw new NotFoundException(`blog post with slug "${slug}" not found`);
    }
    return this.toResponse(post);
  }

  async findOne(postId: string): Promise<BlogResponse> {
    const post = await this.blogModel.findById(postId);
    if (!post) {
      throw new NotFoundException(`blog post with id ${postId} not found`);
    }
    return this.toResponse(post);
  }

  async update(
    postId: string,
    updateBlogDto: UpdateBlogDto,
    coverImage?: Express.Multer.File,
  ): Promise<BlogResponse> {
    const existingPost = await this.blogModel.findById(postId);
    if (!existingPost) {
      throw new NotFoundException(`blog post with id ${postId} not found`);
    }

    const updateData: Record<string, any> = { ...updateBlogDto };

    if (updateBlogDto.title && updateBlogDto.title !== existingPost.title) {
      updateData.slug = await this.generateUniqueSlug(updateBlogDto.title, postId);
    }

    if (coverImage) {
      const uploadResult = await this.cloudinaryService.uploadImage(coverImage, BLOG_COVER_FOLDER);
      updateData.coverImageUrl = uploadResult.url;
      updateData.coverImagePublicId = uploadResult.publicId;

      if (existingPost.coverImagePublicId) {
        await this.cloudinaryService.deleteImage(existingPost.coverImagePublicId);
      }
    }

    const updatedPost = await this.blogModel.findByIdAndUpdate(
      postId,
      { $set: updateData },
      { new: true },
    );

    return this.toResponse(updatedPost!);
  }

  async remove(postId: string): Promise<{ message: string }> {
    const deletedPost = await this.blogModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      throw new NotFoundException(`blog post with id ${postId} not found`);
    }

    if (deletedPost.coverImagePublicId) {
      await this.cloudinaryService.deleteImage(deletedPost.coverImagePublicId);
    }

    return { message: "blog post deleted successfully" };
  }

  private async generateUniqueSlug(title: string, excludePostId?: string): Promise<string> {
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    let candidateSlug = baseSlug;
    let suffix = 1;

    while (true) {
      const conflict = await this.blogModel.findOne({
        slug: candidateSlug,
        ...(excludePostId ? { _id: { $ne: excludePostId } } : {}),
      });

      if (!conflict) {
        return candidateSlug;
      }

      suffix += 1;
      candidateSlug = `${baseSlug}-${suffix}`;
    }
  }

  private toResponse(post: BlogPostDocument): BlogResponse {
    return {
      id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImageUrl: post.coverImageUrl,
      author: post.author,
      isPublished: post.isPublished,
      publishDate: post.publishDate,
      createdAt: (post as any).createdAt,
    };
  }
}