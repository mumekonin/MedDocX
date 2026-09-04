import {
  Controller, Get, Post, Put, Delete,
  Body, Param, UseGuards, UseInterceptors, UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { BlogService } from "../service/blog.service";
import { CreateBlogDto ,UpdateBlogDto} from "../dto/blog.dto";
import { JwtAuthGuard } from "../../common/guards/jwtauth.gourds";

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAllPublished() {
    return this.blogService.findAllPublished();
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAllForAdmin() {
    return this.blogService.findAllForAdmin();
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('coverImage'))
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() coverImage: Express.Multer.File,
  ) {
    return this.blogService.create(createBlogDto, coverImage);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('coverImage'))
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() coverImage: Express.Multer.File,
  ) {
    return this.blogService.update(id, updateBlogDto, coverImage);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}