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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
let CategoriesService = class CategoriesService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ order: { order: 'ASC', id: 'ASC' } });
    }
    async findAllWithActiveProducts() {
        return this.repo.createQueryBuilder('c')
            .leftJoinAndSelect('c.products', 'p')
            .where('p.isActive = true')
            .orderBy('c.order', 'ASC')
            .addOrderBy('c.id', 'ASC')
            .addOrderBy('p.name', 'ASC')
            .getMany();
    }
    findOne(id) {
        return this.repo.findOne({ where: { id } }).then(c => {
            if (!c)
                throw new common_1.NotFoundException('Categoría no encontrada');
            return c;
        });
    }
    create(data) { return this.repo.save(this.repo.create(data)); }
    async update(id, data) {
        const c = await this.findOne(id);
        Object.assign(c, data);
        return this.repo.save(c);
    }
    async remove(id) {
        const c = await this.findOne(id);
        await this.repo.remove(c);
        return { ok: true };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map