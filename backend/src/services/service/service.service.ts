import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Service, ServiceDocument } from "../schema/service.schema";
import { CreateServiceDto, UpdateServiceDto } from "../dto/service.dto";
import { ServiceResponse } from "../response/service.response";

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) { }

  async create(createServiceDto: CreateServiceDto): Promise<ServiceResponse> {
    const service = await this.serviceModel.findOne({ title: createServiceDto.title });
    if (service) {
      throw new NotFoundException(`Service with title ${createServiceDto.title} already exists`);
    }
    const nextOrder = await this.getNextOrder();
       
    const newService = new this.serviceModel({
      ...createServiceDto,
      order: nextOrder,
    });
    const savedService = await newService.save();

    return this.toResponse(savedService);
  }

  async findAll(): Promise<ServiceResponse[]> {
    const services = await this.serviceModel
      .find({ isActive: true })
      .sort({ order: 1 });
    return services.map((service) => this.toResponse(service));
  }

  async findOne(serviceId: string): Promise<ServiceResponse> {
    const service = await this.serviceModel.findById(serviceId);
    if (!service) {
      throw new NotFoundException(`service with id ${serviceId} not found`);
    }
    return this.toResponse(service);
  }

  async update(serviceId: string, updateServiceDto: UpdateServiceDto): Promise<ServiceResponse> {
    const updatedService = await this.serviceModel.findByIdAndUpdate(
      serviceId,
      { $set: updateServiceDto },
      { new: true },
    );
    if (!updatedService) {
      throw new NotFoundException(`service with id ${serviceId} not found`);
    }
    return this.toResponse(updatedService);
  }

  async remove(serviceId: string): Promise<{ message: string }> {
    const deletedService = await this.serviceModel.findByIdAndDelete(serviceId);
    if (!deletedService) {
      throw new NotFoundException(`service with id ${serviceId} not found`);
    }
    return { message: "service deleted successfully" };
  }

  private async getNextOrder(): Promise<number> {
    const lastService = await this.serviceModel
      .findOne()
      .sort({ order: -1 })
      .select('order');
    return lastService ? lastService.order + 1 : 1;
  }

  private toResponse(service: ServiceDocument): ServiceResponse {
    return {
      id: service._id.toString(),
      title: service.title,
      icon: service.icon,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      order: service.order,
      isActive: service.isActive,
      createdAt: (service as any).createdAt,
    };
  }
}