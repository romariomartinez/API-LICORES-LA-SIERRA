import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '../categories/categories.service';

@ApiTags('menu-public')
@Controller('menu')
export class MenuController {
  constructor(private categories: CategoriesService) {}

  @Get()
  async getMenu() {
    const cats = await this.categories.findAllWithActiveProducts();
    return cats.map(c => ({
      id: c.id,
      name: c.name,
      description: c.description,
      order: c.order,
      products: (c.products || []).filter(p => p.isActive).map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        imageUrl: p.imageUrl,
      })),
    }));
  }
}
