import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CategoriesService } from './categories.service';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Get() list() { return this.service.findAll(); }
  @Get(':id') get(@Param('id') id: number) { return this.service.findOne(+id); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post() create(@Body() body: any) { return this.service.create(body); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id') update(@Param('id') id: number, @Body() body: any) { return this.service.update(+id, body); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id') remove(@Param('id') id: number) { return this.service.remove(+id); }
}
