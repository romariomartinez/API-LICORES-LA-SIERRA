import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadsService {
  private useCloudinary = false;
  constructor() {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
      cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
      });
      this.useCloudinary = true;
    }
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Archivo requerido (campo "file")');

    if (this.useCloudinary) {
      return new Promise<{ imageUrl: string }>((resolve, reject) => {
        const opts: any = {};
        if (process.env.CLOUDINARY_FOLDER) opts.folder = process.env.CLOUDINARY_FOLDER;
        const stream = cloudinary.uploader.upload_stream(opts, (err, result) => {
          if (err || !result) return reject(err || new Error('Upload fallido'));
          resolve({ imageUrl: (result as any).secure_url });
        });
        stream.end(file.buffer);
      });
    }

    // Fallback local
    const uploadsDir = path.join(process.cwd(), 'uploads');
    await fs.promises.mkdir(uploadsDir, { recursive: true });
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    const full = path.join(uploadsDir, safeName);
    await fs.promises.writeFile(full, file.buffer);
    return { imageUrl: `/uploads/${safeName}` };
  }
}
