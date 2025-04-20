import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity'; // Import the interface for the Order schema
import { CreateOrderDto } from './dto/create-order.dto'; // DTO for creating orders
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  // Create a new order
  async createOrder(createOrderDto: CreateOrderDto, userId: string): Promise<Order> {
    let totalPrice =0;
    for (const item of createOrderDto.products)
    {
      let product = await  this.productModel.findById(item.product);
      totalPrice += product.price * item.quantity
    }
    createOrderDto.totalPrice = totalPrice
    const createdOrder = new this.orderModel({
      ...createOrderDto,
      user: userId, // Associate the order with the user making the request
    });
    return createdOrder.save();
  }

  // Get all orders for a specific user
  async getOrders(userId: string): Promise<Order[]> {
    return this.orderModel.find({ user: userId }).exec();
  }

  // Get a specific order by id for a user
  async getOrderById(orderId: string, userId: string): Promise<Order> {
    return this.orderModel.findOne({ _id: orderId, user: userId }).exec();
  }
}
