import {Controller, Get, Post, Put, Delete,Body, Param, UseGuards, UseInterceptors, UploadedFile} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { TestimonialsService } from "../service/testimonials.service";
import { CreateTestimonialDto } from "../dto/testimonials.dto";
import { UpdateTestimonialDto } from "../dto/testimonials.dto";
import { JwtAuthGuard } from "../../common/guards/jwtauth.gourds";

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  async findAll() {
    return this.testimonialsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Body() createTestimonialDto: CreateTestimonialDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.testimonialsService.create(createTestimonialDto, avatar);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.testimonialsService.update(id, updateTestimonialDto, avatar);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }
}