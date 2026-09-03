import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Service, ServiceSchema } from "../services/schema/service.schema";
import { ServicesController } from "../services/controller/service.controller";
import { ServicesService } from "../services/service/service.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}