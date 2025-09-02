"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const fs = require("fs");
const path = require("path");
let UploadsService = class UploadsService {
    constructor() {
        this.useCloudinary = false;
        const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
        if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
            cloudinary_1.v2.config({
                cloud_name: CLOUDINARY_CLOUD_NAME,
                api_key: CLOUDINARY_API_KEY,
                api_secret: CLOUDINARY_API_SECRET,
            });
            this.useCloudinary = true;
        }
    }
    async uploadImage(file) {
        if (!file)
            throw new common_1.BadRequestException('Archivo requerido (campo "file")');
        if (this.useCloudinary) {
            return new Promise((resolve, reject) => {
                const opts = {};
                if (process.env.CLOUDINARY_FOLDER)
                    opts.folder = process.env.CLOUDINARY_FOLDER;
                const stream = cloudinary_1.v2.uploader.upload_stream(opts, (err, result) => {
                    if (err || !result)
                        return reject(err || new Error('Upload fallido'));
                    resolve({ imageUrl: result.secure_url });
                });
                stream.end(file.buffer);
            });
        }
        const uploadsDir = path.join(process.cwd(), 'uploads');
        await fs.promises.mkdir(uploadsDir, { recursive: true });
        const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
        const full = path.join(uploadsDir, safeName);
        await fs.promises.writeFile(full, file.buffer);
        return { imageUrl: `/uploads/${safeName}` };
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map