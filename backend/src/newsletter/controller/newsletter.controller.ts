import { Controller, Post, Get, Delete, Body, Query, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { NewsletterService } from "../service/newsletter.service";
import { SubscribeNewsletterDto } from "../dto/newsletter.dto";
import { JwtAuthGuard } from "../../common/guards/jwtauth.gourds";

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Throttle({ default: { limit: 3, ttl: 60_000 * 60 } })
  @Post('subscribe')
  async subscribe(@Body() dto: SubscribeNewsletterDto) {
    return this.newsletterService.subscribe(dto);
  }

  @Post('unsubscribe')
  async unsubscribe(@Query('email') email: string) {
    return this.newsletterService.unsubscribe(email);
  }

  @JwtAuthGuard()
  @Get()
  async findAll() {
    return this.newsletterService.findAll();
  }
}