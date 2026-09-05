import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NewsletterSubscriber, NewsletterSubscriberDocument } from "../schema/newsletter.schema";
import { SubscribeNewsletterDto } from "../dto/newsletter.dto";
import { NewsletterResponse } from "../response/newsletter.response";

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel(NewsletterSubscriber.name)
    private readonly subscriberModel: Model<NewsletterSubscriberDocument>,
  ) {}

  async subscribe(dto: SubscribeNewsletterDto): Promise<{ message: string }> {
    if (this.isBotSubmission(dto)) {
      return { message: "subscribed successfully" }; 
    }

    const existingSubscriber = await this.subscriberModel.findOne({ email: dto.email });
    if (existingSubscriber) {
      return { message: "you're already subscribed" };
    }

    await this.subscriberModel.create({ email: dto.email });
    return { message: "subscribed successfully" };
  }

  async findAll(): Promise<NewsletterResponse[]> {
    const subscribers = await this.subscriberModel.find().sort({ createdAt: -1 });
    return subscribers.map((subscriber) => this.toResponse(subscriber));
  }

  async unsubscribe(email: string): Promise<{ message: string }> {
    const deletedSubscriber = await this.subscriberModel.findOneAndDelete({ email });
    if (!deletedSubscriber) {
      throw new NotFoundException("email not found in subscriber list");
    }
    return { message: "unsubscribed successfully" };
  }

  private isBotSubmission(dto: SubscribeNewsletterDto): boolean {
    return !!dto.website && dto.website.trim().length > 0;
  }

  private toResponse(subscriber: NewsletterSubscriberDocument): NewsletterResponse {
    return {
      id: subscriber._id.toString(),
      email: subscriber.email,
      createdAt: (subscriber as any).createdAt,
    };
  }
}