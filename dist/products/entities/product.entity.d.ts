import { Category } from '../../categories/entities/category.entity';
export declare class Product {
    id: number;
    category: Category;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
