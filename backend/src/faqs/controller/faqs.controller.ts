import {Controller, Get, Post, Put, Delete,Body, Param, UseGuards,}from "@nestjs/common";
import { FaqsService } from "../service/faqs.service";
import { CreateFaqDto,UpdateFaqDto } from "../dto/faqs.dto";
import { JwtAuthGuard } from "../../common/guards/jwtauth.gourds";

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  async findAll() {
    return this.faqsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.faqsService.findOne(id);
  }

  @JwtAuthGuard()
  @Post()
  async create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqsService.create(createFaqDto);
  }

  @JwtAuthGuard()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateFaqDto,
  ) {
    return this.faqsService.update(id, updateFaqDto);
  }

  @JwtAuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.faqsService.remove(id);
  }
}