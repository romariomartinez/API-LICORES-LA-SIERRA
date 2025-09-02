import { CategoriesService } from '../categories/categories.service';
export declare class MenuController {
    private categories;
    constructor(categories: CategoriesService);
    getMenu(): Promise<{
        id: number;
        name: string;
        description: string | undefined;
        order: number;
        products: {
            id: number;
            name: string;
            description: string | undefined;
            price: number;
            imageUrl: string | undefined;
        }[];
    }[]>;
}
