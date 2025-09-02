import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private service;
    constructor(service: ProductsService);
    list(categoryId?: number, q?: string, active?: string, page?: number, limit?: number, sort?: string, dir?: 'ASC' | 'DESC'): Promise<{
        items: import("./entities/product.entity").Product[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    get(id: number): Promise<import("./entities/product.entity").Product>;
    create(dto: CreateProductDto): Promise<import("./entities/product.entity").Product>;
    update(id: number, dto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
