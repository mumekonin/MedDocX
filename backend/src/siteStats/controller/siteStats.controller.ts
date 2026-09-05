import { Controller, Get, Put, Body, UseGuards } from "@nestjs/common";
import { SiteStatsService } from "../service/siteStats.service";
import { UpdateSiteStatsDto } from "../dto/siteStats.dto";
import { JwtAuthGuard } from "../../common/guards/jwtauth.gourds";

@Controller('site-stats')
export class SiteStatsController {
  constructor(private readonly siteStatsService: SiteStatsService) {}

  @Get()
  async get() {
    return this.siteStatsService.get();
  }

  @JwtAuthGuard()
  @Put()
  async update(@Body() dto: UpdateSiteStatsDto) {
    return this.siteStatsService.update(dto);
  }
}