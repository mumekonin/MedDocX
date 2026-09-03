import {Controller, Get, Post, Put, Delete,Body, Param} from "@nestjs/common";
import { ServicesService } from "../service/service.service";
import { CreateServiceDto,UpdateServiceDto } from "../dto/service.dto";
import { JwtAuthGuard } from "../../common/guards/jwtauth.gourds";

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }
@JwtAuthGuard()
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @JwtAuthGuard()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, updateServiceDto);
  }

@JwtAuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}