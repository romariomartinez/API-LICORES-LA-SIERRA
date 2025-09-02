import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { MenuController } from './menu.controller';
import { CategoriesService } from '../categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [MenuController],
  providers: [CategoriesService],
})
export class MenuModule {}
