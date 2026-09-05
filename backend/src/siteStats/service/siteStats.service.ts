import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SiteStats, SiteStatsDocument } from "../schema/siteStats.schema";
import { UpdateSiteStatsDto } from "../dto/siteStats.dto";
import { SiteStatsResponse } from "../response/siteStats.response";

@Injectable()
export class SiteStatsService {
  constructor(
    @InjectModel(SiteStats.name)
    private readonly siteStatsModel: Model<SiteStatsDocument>,
  ) {}

  async get(): Promise<SiteStatsResponse> {
    let stats = await this.siteStatsModel.findOne();
    if (!stats) {
      stats = await this.siteStatsModel.create({}); 
    }
    return this.toResponse(stats);
  }

  async update(dto: UpdateSiteStatsDto): Promise<SiteStatsResponse> {
    let stats = await this.siteStatsModel.findOne();
    if (!stats) {
      stats = await this.siteStatsModel.create(dto);
      return this.toResponse(stats);
    }

    stats = await this.siteStatsModel.findByIdAndUpdate(
      stats._id,
      { $set: dto },
      { new: true },
    );
    return this.toResponse(stats!);
  }

  private toResponse(stats: SiteStatsDocument): SiteStatsResponse {
    return {
      patientsCount: stats.patientsCount,
      doctorsCount: stats.doctorsCount,
      emergencyCareLabel: stats.emergencyCareLabel,
    };
  }
}