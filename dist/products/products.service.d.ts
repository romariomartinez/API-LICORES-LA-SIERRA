import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
type ListParams = {
    categoryId?: number;
    q?: string;
    active?: boolean;
    page?: number;
    limit?: number;
    sort?: string;
    dir?: 'ASC' | 'DESC';
};
export declare class ProductsService {
    private repo;
    private cats;
    constructor(repo: Repository<Product>, cats: Repository<Category>);
    list(params: ListParams): Promise<{
        items: Product[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    get(id: number): Promise<Product>;
    create(dto: CreateProductDto): Promise<Product>;
    update(id: number, dto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
export {};
