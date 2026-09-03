import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppointmentsService } from '../service/appointments.service';
import {
  CreateAppointmentDto,
  UpdateStatusDto,
  QueryAppointmentDto,
} from '../dto/appointments.dto';
import { JwtAuthGuard } from '../../common/guards/jwtauth.gourds';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Throttle({ default: { limit: 3, ttl: 60_000 * 60 } })
  @Post()
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get()
  async findAll(@Query() queryDto: QueryAppointmentDto) {
    return this.appointmentsService.findAll(queryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @JwtAuthGuard()
  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.appointmentsService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    return this.appointmentsService.deleteAppointment(id);
  }
}
