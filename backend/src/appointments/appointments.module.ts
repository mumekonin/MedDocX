import { Module } from "@nestjs/common";
import { AppointmentsController } from "./controller/appointments.controller";
import { AppointmentsService } from "./service/appointments.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Appointment ,AppointmentSchema} from "./schema/appointments.schema";
@Module({
  imports:[
        MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]),  
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],

})
export class AppointmentsModule {}