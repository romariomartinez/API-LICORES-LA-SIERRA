import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
export declare class CategoriesService {
    private repo;
    constructor(repo: Repository<Category>);
    findAll(): Promise<Category[]>;
    findAllWithActiveProducts(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    create(data: Partial<Category>): Promise<Category>;
    update(id: number, data: Partial<Category>): Promise<Category>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
