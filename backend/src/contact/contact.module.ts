import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContactMessage, ContactMessageSchema } from "../contact/schema/contact.schema";
import { ContactController } from "./controller/contact.controller";
import { ContactService } from "./service/contact.service";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ContactMessage.name, schema: ContactMessageSchema }]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}