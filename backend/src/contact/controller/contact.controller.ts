import {Controller, Get, Post, Put, Delete,Body, Param} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { ContactService } from "../service/contact.service";
import { CreateContactDto ,UpdateReadStatusDto} from "../dto/contact.dto";
import { JwtAuthGuard } from "../../common/guards/jwtauth.gourds";

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Throttle({ default: { limit: 3, ttl: 60_000 * 60 } }) 
  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @JwtAuthGuard()
  @Get()
  async findAll() {
    return this.contactService.findAll();
  }

  @JwtAuthGuard()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @JwtAuthGuard()
  @Put(':id/read')
  async updateReadStatus(
    @Param('id') id: string,
    @Body() updateReadStatusDto: UpdateReadStatusDto,
  ) {
    return this.contactService.updateReadStatus(id, updateReadStatusDto);
  }

  @JwtAuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}