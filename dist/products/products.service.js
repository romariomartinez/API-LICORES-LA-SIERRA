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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const category_entity_1 = require("../categories/entities/category.entity");
let ProductsService = class ProductsService {
    constructor(repo, cats) {
        this.repo = repo;
        this.cats = cats;
    }
    async list(params) {
        const { categoryId, q, active, page = 1, limit = 12, sort, dir } = params;
        const qb = this.repo.createQueryBuilder('p')
            .leftJoinAndSelect('p.category', 'c');
        if (categoryId)
            qb.andWhere('c.id = :categoryId', { categoryId });
        if (typeof active === 'boolean')
            qb.andWhere('p.isActive = :active', { active });
        if (q)
            qb.andWhere('(p.name LIKE :q OR p.description LIKE :q OR c.name LIKE :q)', { q: `%${q}%` });
        const sortable = new Set(['createdAt', 'price', 'name', 'id', 'updatedAt']);
        const orderField = sortable.has(String(sort)) ? `p.${sort}` : 'p.createdAt';
        qb.orderBy(orderField, dir === 'ASC' ? 'ASC' : 'DESC');
        const take = Math.min(Math.max(Number(limit) || 12, 1), 100);
        const skip = (Math.max(Number(page) || 1, 1) - 1) * take;
        qb.take(take).skip(skip);
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page: Number(page) || 1, limit: take, pages: Math.ceil(total / take) };
    }
    async get(id) {
        const p = await this.repo.findOne({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException('Producto no encontrado');
        return p;
    }
    async create(dto) {
        var _a;
        const cat = await this.cats.findOne({ where: { id: dto.categoryId } });
        if (!cat)
            throw new common_1.NotFoundException('Categoría no existe');
        const product = this.repo.create({
            category: cat,
            name: dto.name,
            description: dto.description,
            price: dto.price,
            imageUrl: dto.imageUrl,
            isActive: (_a = dto.isActive) !== null && _a !== void 0 ? _a : true,
        });
        return this.repo.save(product);
    }
    async update(id, dto) {
        var _a, _b, _c, _d, _e;
        const p = await this.get(id);
        if (dto.categoryId) {
            const cat = await this.cats.findOne({ where: { id: dto.categoryId } });
            if (!cat)
                throw new common_1.NotFoundException('Categoría no existe');
            p.category = cat;
        }
        Object.assign(p, {
            name: (_a = dto.name) !== null && _a !== void 0 ? _a : p.name,
            description: (_b = dto.description) !== null && _b !== void 0 ? _b : p.description,
            price: (_c = dto.price) !== null && _c !== void 0 ? _c : p.price,
            imageUrl: (_d = dto.imageUrl) !== null && _d !== void 0 ? _d : p.imageUrl,
            isActive: (_e = dto.isActive) !== null && _e !== void 0 ? _e : p.isActive,
        });
        return this.repo.save(p);
    }
    async remove(id) {
        const p = await this.get(id);
        await this.repo.remove(p);
        return { ok: true };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map