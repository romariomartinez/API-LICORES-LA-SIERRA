export declare class UploadsService {
    private useCloudinary;
    constructor();
    uploadImage(file: Express.Multer.File): Promise<{
        imageUrl: string;
    }>;
}
