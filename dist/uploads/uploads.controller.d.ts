import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private service;
    constructor(service: UploadsService);
    upload(file: Express.Multer.File): Promise<{
        imageUrl: string;
    }>;
}
