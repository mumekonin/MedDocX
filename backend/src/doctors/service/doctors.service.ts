import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Doctor, DoctorDocument } from "../schema/doctors.schema";
import { CreateDoctorDto ,UpdateDoctorDto} from "../dto/doctors.dto";
import { DoctorResponse } from "../response/doctors.response";
import { CloudinaryService } from "../../common/cloudinary/service/cloudinary.service";

const DOCTOR_PHOTO_FOLDER = "meddocx/doctors";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto,photo: Express.Multer.File,): Promise<DoctorResponse> {
    const user = await this.doctorModel.findOne({ name: createDoctorDto.name });
    if(user){
      throw new BadRequestException("doctor name already exists");
    }
    if (!photo) {
      throw new BadRequestException("doctor photo is required");
    }

    const uploadResult = await this.cloudinaryService.uploadImage(photo, DOCTOR_PHOTO_FOLDER);

    const newDoctor = new this.doctorModel({
      ...createDoctorDto,
      photoUrl: uploadResult.url,
      photoPublicId: uploadResult.publicId,
    });
    const savedDoctor = await newDoctor.save();
    return this.toResponse(savedDoctor);
  }
  async findAll(): Promise<DoctorResponse[]> {
    const doctors = await this.doctorModel
      .find({ isActive: true })
      .sort({ order: 1 });
    return doctors.map((doctor) => this.toResponse(doctor));
  }

  async findOne(doctorId: string): Promise<DoctorResponse> {
    const doctor = await this.doctorModel.findById(doctorId);
    if (!doctor) {
      throw new BadRequestException("doctor not found");
    }
    return this.toResponse(doctor);
  }
  async update(
    doctorId: string,
    updateDoctorDto: UpdateDoctorDto,
    photo?: Express.Multer.File,
  ): Promise<DoctorResponse> {
    const existingDoctor = await this.doctorModel.findById(doctorId);
    if (!existingDoctor) {
      throw new BadRequestException("doctor not found");
    }

    let photoUrl = existingDoctor.photoUrl;
    let photoPublicId = existingDoctor.photoPublicId;

    if (photo) {
      const uploadResult = await this.cloudinaryService.uploadImage(photo, DOCTOR_PHOTO_FOLDER);
      photoUrl = uploadResult.url;
      photoPublicId = uploadResult.publicId;

      if (existingDoctor.photoPublicId) {
        await this.cloudinaryService.deleteImage(existingDoctor.photoPublicId);
      }
    }
    const updatedDoctor = await this.doctorModel.findByIdAndUpdate(
      doctorId,
      { $set: { ...updateDoctorDto, photoUrl, photoPublicId } },
      { new: true },
    );

    return this.toResponse(updatedDoctor!);
  }
  async remove(doctorId: string): Promise<{ message: string }> {
    const deletedDoctor = await this.doctorModel.findByIdAndDelete(doctorId);
    if (!deletedDoctor) {
      throw new BadRequestException("doctor not found");
    }

    if (deletedDoctor.photoPublicId) {
      await this.cloudinaryService.deleteImage(deletedDoctor.photoPublicId);
    }
    return { message: "doctor deleted successfully" };
  }
  private toResponse(doctor: DoctorDocument): DoctorResponse {
    return {
      id: doctor._id.toString(),
      name: doctor.name,
      specialty: doctor.specialty,
      photoUrl: doctor.photoUrl,
      bio: doctor.bio,
      order: doctor.order,
      isActive: doctor.isActive,
      createdAt: (doctor as any).createdAt,
    };
  }
}