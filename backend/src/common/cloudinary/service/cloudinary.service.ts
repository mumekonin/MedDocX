import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { UploadApiResponse, UploadApiErrorResponse, v2 as CloudinaryType } from "cloudinary";
import { Readable } from "stream";

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
}

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject("CLOUDINARY") private readonly cloudinary: typeof CloudinaryType,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<CloudinaryUploadResult> {
    if (!file) {
      throw new BadRequestException("no file provided");
    }

    const result = await this.streamUpload(file.buffer, folder);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  async deleteImage(publicId: string): Promise<void> {
    await this.cloudinary.uploader.destroy(publicId);
  }

  private streamUpload(buffer: Buffer, folder: string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        { folder, resource_type: "image" },
        (error: UploadApiErrorResponse | undefined, result?: UploadApiResponse) => {
          if (error || !result) {
            return reject(error ?? new Error("cloudinary upload failed"));
          }
          resolve(result);
        },
      );
      Readable.from(buffer).pipe(uploadStream);
    });
  }
}