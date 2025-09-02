import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

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

  findOne(id: number) {
    return this.repo.findOne({ where: { id } }).then(c => {
      if (!c) throw new NotFoundException('Categoría no encontrada');
      return c;
    });
  }

  create(data: Partial<Category>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Category>) {
    const c = await this.findOne(id);
    Object.assign(c, data);
    return this.repo.save(c);
  }

  async remove(id: number) {
    const c = await this.findOne(id);
    await this.repo.remove(c);
    return { ok: true };
  }
}
