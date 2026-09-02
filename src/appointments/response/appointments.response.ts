export class AppointmentResponse {
  id?: string;
  patientName?: string;
  email?: string;
  phone?: string;
  preferredDoctor?: string;
  preferredDate?: Date;
  preferredTime?: string;
  reason?: string;
  status?: string;
  createdAt?: Date;
}