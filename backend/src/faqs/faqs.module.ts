import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Faq, FaqSchema } from "../faqs/schema/faqs.schema";
import { FaqsController } from "../faqs/controller/faqs.controller";
import { FaqsService } from "../faqs/service/faqs.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Faq.name, schema: FaqSchema }]),
  ],
  controllers: [FaqsController],
  providers: [FaqsService],
})
export class FaqsModule {}