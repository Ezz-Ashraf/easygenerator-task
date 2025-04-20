import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model, Types } from 'mongoose';
import { constants } from 'src/constants';
import { Product } from './entities/product.entity';
import { ProductDto } from './entities/Product.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  
  create(createProductDto: CreateProductDto) {
    const createdCat = new this.productModel(createProductDto);
    return createdCat.save();
  }

  async findAll(): Promise<ProductDto[]> {
    const products = await this.productModel.find().exec();
    return products.map(ProductDto.fromEntity);
  }

  async findOne(id: string) : Promise<ProductDto> {
    const product = await this.productModel.findById(id).exec();
  if (!product) {
    throw new NotFoundException(`Product with id ${id} not found`);
  }
  return ProductDto.fromEntity(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    let product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const objectId = new Types.ObjectId(id);
    await  this.productModel.findByIdAndUpdate(id,{...updateProductDto}).exec();

    product = await this.productModel.findById(id).exec();
    return ProductDto.fromEntity(product);
  }

  remove(id: string) {
    return  this.productModel.deleteOne({id}).exec();
  }
}
