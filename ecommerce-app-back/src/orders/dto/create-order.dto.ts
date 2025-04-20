import { ApiProperty } from '@nestjs/swagger'; // For Swagger docs
import { IsArray, IsNumber, IsString, IsNotEmpty, Min } from 'class-validator'; // Validations

export class CreateOrderDto {
  @ApiProperty({ description: 'Array of products with quantity' })
  @IsArray()
  @IsNotEmpty()
  products: { product: string; quantity: number }[];

  totalPrice: number;
}
