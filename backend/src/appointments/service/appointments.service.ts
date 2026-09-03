import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from '../schema/appointments.schema';
import {
  CreateAppointmentDto,
  UpdateStatusDto,
  QueryAppointmentDto,
} from '../dto/appointments.dto';
import { AppointmentResponse } from '../response/appointments.response';
import { AppointmentStatus } from '../../common/enum/enum';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  async createAppointment(dto: CreateAppointmentDto): Promise<AppointmentResponse> {
    if (this.isBotSubmission(dto)) {
      return this.buildFakeSuccessResponse(dto);
    }
    const { website, ...appointmentData } = dto;
    const newAppointment = new this.appointmentModel({
      ...appointmentData,
      status: AppointmentStatus.PENDING,
    });
    const savedAppointment = await newAppointment.save();
    return this.toResponse(savedAppointment);
  }

  async updateStatus(appointmentId: string, dto: UpdateStatusDto): Promise<AppointmentResponse> {
    const updatedAppointment = await this.appointmentModel.findByIdAndUpdate(
      appointmentId,
      { $set: { status: dto.status } },
      { new: true },
    );
    if (!updatedAppointment) {
      throw new BadRequestException('appointment not found');
    }
    return this.toResponse(updatedAppointment);
  }

  private isBotSubmission(dto: CreateAppointmentDto): boolean {
    return !!dto.website && dto.website.trim().length > 0;
  }

  private buildFakeSuccessResponse(dto: CreateAppointmentDto): AppointmentResponse {
    return {
      patientName: dto.patientName,
      email: dto.email,
      phone: dto.phone,
      preferredDate: new Date(dto.preferredDate),
      preferredTime: dto.preferredTime,
      status: AppointmentStatus.PENDING,
    };
  }

  private toResponse(appointment: AppointmentDocument): AppointmentResponse {
    return {
      id: appointment._id.toString(),
      patientName: appointment.patientName,
      email: appointment.email,
      phone: appointment.phone,
      preferredDoctor: appointment.preferredDoctor?.toString(),
      preferredDate: appointment.preferredDate,
      preferredTime: appointment.preferredTime,
      reason: appointment.reason,
      status: appointment.status,
      createdAt: appointment.createdAt,
    };
  }

  async findAll(query: QueryAppointmentDto): Promise<AppointmentResponse[]> {
    const filter = query.status ? { status: query.status } : {};
    const appointments = await this.appointmentModel.find(filter).sort({ createdAt: -1 });
    return appointments.map((appointment) => this.toResponse(appointment));
  }

  async findOne(appointmentId: string): Promise<AppointmentResponse> {
    const appointment = await this.appointmentModel.findById(appointmentId);
    if (!appointment) {
      throw new BadRequestException('appointment not found');
    }
    return this.toResponse(appointment);
  }

  async deleteAppointment(appointmentId: string): Promise<{ message: string }> {
    const deletedAppointment = await this.appointmentModel.findByIdAndDelete(appointmentId);
    if (!deletedAppointment) {
      throw new BadRequestException('appointment not found');
    }
    return { message: 'appointment deleted successfully' };
  }
}
