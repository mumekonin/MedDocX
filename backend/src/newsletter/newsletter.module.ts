import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NewsletterSubscriber, NewsletterSubscriberSchema } from "./schema/newsletter.schema";
import { NewsletterController } from "./controller/newsletter.controller";
import { NewsletterService } from "./service/newsletter.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NewsletterSubscriber.name, schema: NewsletterSubscriberSchema },

    ]),
  ],
  controllers: [NewsletterController],
  providers: [NewsletterService],
})
export class NewsletterModule {}