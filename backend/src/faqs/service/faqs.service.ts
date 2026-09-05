import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Faq, FaqDocument } from "../schema/faqs.schema";
import { CreateFaqDto ,UpdateFaqDto} from "../dto/faqs.dto";
import { FaqResponse } from "../response/faqs.response";

@Injectable()
export class FaqsService {
  constructor(
    @InjectModel(Faq.name)
    private readonly faqModel: Model<FaqDocument>,
  ) {}

  async create(createFaqDto: CreateFaqDto): Promise<FaqResponse> {
    const nextOrder = await this.getNextOrder();

    const newFaq = new this.faqModel({
      ...createFaqDto,
      order: nextOrder,
    });
    const savedFaq = await newFaq.save();

    return this.toResponse(savedFaq);
  }

  async findAll(): Promise<FaqResponse[]> {
    const faqs = await this.faqModel
      .find({ isActive: true })
      .sort({ order: 1 });
    return faqs.map((faq) => this.toResponse(faq));
  }

  async findOne(faqId: string): Promise<FaqResponse> {
    const faq = await this.faqModel.findById(faqId);
    if (!faq) {
      throw new NotFoundException(`faq with id ${faqId} not found`);
    }
    return this.toResponse(faq);
  }

  async update(faqId: string, updateFaqDto: UpdateFaqDto): Promise<FaqResponse> {
    const updatedFaq = await this.faqModel.findByIdAndUpdate(
      faqId,
      { $set: updateFaqDto },
      { new: true },
    );
    if (!updatedFaq) {
      throw new NotFoundException(`faq with id ${faqId} not found`);
    }
    return this.toResponse(updatedFaq);
  }

  async remove(faqId: string): Promise<{ message: string }> {
    const deletedFaq = await this.faqModel.findByIdAndDelete(faqId);
    if (!deletedFaq) {
      throw new NotFoundException(`faq with id ${faqId} not found`);
    }
    return { message: "faq deleted successfully" };
  }

  private async getNextOrder(): Promise<number> {
    const lastFaq = await this.faqModel
      .findOne()
      .sort({ order: -1 })
      .select('order');
    return lastFaq ? lastFaq.order + 1 : 1;
  }

  private toResponse(faq: FaqDocument): FaqResponse {
    return {
      id: faq._id.toString(),
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      isActive: faq.isActive,
      createdAt: (faq as any).createdAt,
    };
  }
}