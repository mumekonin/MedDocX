import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContactMessage, ContactMessageDocument } from "../schema/contact.schema";
import { CreateContactDto,UpdateReadStatusDto } from "../dto/contact.dto";
import { ContactResponse } from "../response/contact.response";

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(ContactMessage.name)
    private readonly contactModel: Model<ContactMessageDocument>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<ContactResponse> {
    if (this.isBotSubmission(createContactDto)) {
      return this.buildFakeSuccessResponse(createContactDto);
    }

    const { website, ...contactData } = createContactDto;

    const newMessage = new this.contactModel(contactData);
    const savedMessage = await newMessage.save();

    return this.toResponse(savedMessage);
  }

  async findAll(): Promise<ContactResponse[]> {
    const messages = await this.contactModel.find().sort({ createdAt: -1 });
    return messages.map((message) => this.toResponse(message));
  }

  async findOne(messageId: string): Promise<ContactResponse> {
    const message = await this.contactModel.findById(messageId);
    if (!message) {
      throw new NotFoundException(`contact message with id ${messageId} not found`);
    }
    return this.toResponse(message);
  }

  async updateReadStatus(
    messageId: string,
    updateReadStatusDto: UpdateReadStatusDto,
  ): Promise<ContactResponse> {
    const updatedMessage = await this.contactModel.findByIdAndUpdate(
      messageId,
      { $set: { isRead: updateReadStatusDto.isRead } },
      { new: true },
    );
    if (!updatedMessage) {
      throw new NotFoundException(`contact message with id ${messageId} not found`);
    }
    return this.toResponse(updatedMessage);
  }

  async remove(messageId: string): Promise<{ message: string }> {
    const deletedMessage = await this.contactModel.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      throw new NotFoundException(`contact message with id ${messageId} not found`);
    }
    return { message: "contact message deleted successfully" };
  }

  private isBotSubmission(dto: CreateContactDto): boolean {
    return !!dto.website && dto.website.trim().length > 0;
  }

  private buildFakeSuccessResponse(dto: CreateContactDto): ContactResponse {
    return {
      name: dto.name,
      email: dto.email,
      subject: dto.subject,
      message: dto.message,
      isRead: false,
    };
  }

  private toResponse(message: ContactMessageDocument): ContactResponse {
    return {
      id: message._id.toString(),
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      isRead: message.isRead,
      createdAt: (message as any).createdAt,
    };
  }
}