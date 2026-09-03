import {Controller, Get, Post, Put, Delete,Body, Param, UseInterceptors, UploadedFile} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { DoctorsService } from "../service/doctors.service";
import { CreateDoctorDto,UpdateDoctorDto } from "../dto/doctors.dto";
import { JwtAuthGuard } from "../../common/guards/jwtauth.gourds";

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  async findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @JwtAuthGuard()
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createDoctorDto: CreateDoctorDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.doctorsService.create(createDoctorDto, photo);
  }

  @JwtAuthGuard()
  @Put(':id')
  @UseInterceptors(FileInterceptor('photo'))
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.doctorsService.update(id, updateDoctorDto, photo);
  }

  @JwtAuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}