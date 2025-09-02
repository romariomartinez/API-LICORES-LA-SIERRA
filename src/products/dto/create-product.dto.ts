import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNumber() categoryId: number;
  @IsString() name: string;
  @IsOptional() @IsString() description?: string;
  @IsNumber() @IsPositive() price: number;
  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
