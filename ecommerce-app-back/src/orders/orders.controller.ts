import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import the JwtAuthGuard
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto'; // DTO for creating orders
import { Order } from './entities/order.entity'; // Interface for Order schema
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'; // For Swagger integration

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Create a new order, protected by JWT authentication
  @Post()
  @UseGuards(JwtAuthGuard) // Protecting the API with the JwtAuthGuard
  @ApiBearerAuth('jwt') // Adding Bearer token auth in Swagger
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req, // Access the user ID from the request (set by JWT guard)
  ): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto, req.user.userId);
  }

  // Get all orders of the authenticated user
  @Get()
  @UseGuards(JwtAuthGuard) // Protecting the API with the JwtAuthGuard
  @ApiBearerAuth('jwt') // Adding Bearer token auth in Swagger
  async getOrders(@Req() req): Promise<Order[]> {
    return this.ordersService.getOrders(req.user.userId);
  }

  // Get a specific order by ID, only if it's the authenticated user's order
  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protecting the API with the JwtAuthGuard
  @ApiBearerAuth('jwt') // Adding Bearer token auth in Swagger
  async getOrderById(
    @Param('id') orderId: string,
    @Req() req,
  ): Promise<Order> {
    return this.ordersService.getOrderById(orderId, req.user.userId);
  }
}
