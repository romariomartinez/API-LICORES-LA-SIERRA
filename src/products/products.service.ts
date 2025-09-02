import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    @InjectRepository(Category) private cats: Repository<Category>,
  ) {}

  async list(params: ListParams) {
    const { categoryId, q, active, page = 1, limit = 12, sort, dir } = params;
    const qb = this.repo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'c');

    if (categoryId) qb.andWhere('c.id = :categoryId', { categoryId });
    if (typeof active === 'boolean') qb.andWhere('p.isActive = :active', { active });
    if (q) qb.andWhere('(p.name LIKE :q OR p.description LIKE :q OR c.name LIKE :q)', { q: `%${q}%` });

    const sortable = new Set(['createdAt', 'price', 'name', 'id', 'updatedAt']);
    const orderField = sortable.has(String(sort)) ? `p.${sort}` : 'p.createdAt';
    qb.orderBy(orderField, dir === 'ASC' ? 'ASC' : 'DESC');

    const take = Math.min(Math.max(Number(limit) || 12, 1), 100);
    const skip = (Math.max(Number(page) || 1, 1) - 1) * take;

    qb.take(take).skip(skip);

    const [items, total] = await qb.getManyAndCount();
    return { items, total, page: Number(page) || 1, limit: take, pages: Math.ceil(total / take) };
  }

  async get(id: number) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Producto no encontrado');
    return p;
  }

  async create(dto: CreateProductDto) {
    const cat = await this.cats.findOne({ where: { id: dto.categoryId } });
    if (!cat) throw new NotFoundException('Categoría no existe');
    const product = this.repo.create({
      category: cat,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      imageUrl: dto.imageUrl,
      isActive: dto.isActive ?? true,
    });
    return this.repo.save(product);
  }

  async update(id: number, dto: UpdateProductDto) {
    const p = await this.get(id);
    if ((dto as any).categoryId) {
      const cat = await this.cats.findOne({ where: { id: (dto as any).categoryId } });
      if (!cat) throw new NotFoundException('Categoría no existe');
      p.category = cat;
    }
    Object.assign(p, {
      name: dto.name ?? p.name,
      description: dto.description ?? p.description,
      price: dto.price ?? p.price,
      imageUrl: dto.imageUrl ?? p.imageUrl,
      isActive: dto.isActive ?? p.isActive,
    });
    return this.repo.save(p);
  }

  async remove(id: number) {
    const p = await this.get(id);
    await this.repo.remove(p);
    return { ok: true };
  }
}
