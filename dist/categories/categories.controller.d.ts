import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private service;
    constructor(service: CategoriesService);
    list(): Promise<import("./entities/category.entity").Category[]>;
    get(id: number): Promise<import("./entities/category.entity").Category>;
    create(body: any): Promise<import("./entities/category.entity").Category>;
    update(id: number, body: any): Promise<import("./entities/category.entity").Category>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
