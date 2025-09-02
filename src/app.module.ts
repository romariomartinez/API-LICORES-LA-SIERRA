import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/ormconfig';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UploadsModule } from './uploads/uploads.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: () => ormConfig }),
    AuthModule,
    CategoriesModule,
    ProductsModule,
    UploadsModule,
    MenuModule,
  ],
})
export class AppModule {}
