import { Controller, Get, Param, Post, Patch, Delete, Body, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiQuery({ name: 'active', required: false, type: Boolean })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String, description: 'id|name|price|createdAt|updatedAt' })
  @ApiQuery({ name: 'dir', required: false, type: String, description: 'ASC|DESC' })
  @Get()
  list(
    @Query('categoryId') categoryId?: number,
    @Query('q') q?: string,
    @Query('active') active?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sort') sort?: string,
    @Query('dir') dir?: 'ASC' | 'DESC',
  ) {
    const params = {
      categoryId: categoryId ? Number(categoryId) : undefined,
      q,
      active: typeof active !== 'undefined' ? active === 'true' || active === '1' : undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      sort,
      dir,
    };
    return this.service.list(params as any);
  }

  @Get(':id') get(@Param('id') id: number) { return this.service.get(+id); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post() create(@Body() dto: CreateProductDto) { return this.service.create(dto); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id') update(@Param('id') id: number, @Body() dto: UpdateProductDto) { return this.service.update(+id, dto); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id') remove(@Param('id') id: number) { return this.service.remove(+id); }
}
