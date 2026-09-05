import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SiteStats, SiteStatsSchema } from "./schema/siteStats.schema";
import { SiteStatsController } from "./controller/siteStats.controller";
import { SiteStatsService } from "./service/siteStats.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SiteStats.name, schema: SiteStatsSchema },
    ]),
  ],
  controllers: [SiteStatsController],
  providers: [ SiteStatsService],
})
export class SiteStatsModule {}