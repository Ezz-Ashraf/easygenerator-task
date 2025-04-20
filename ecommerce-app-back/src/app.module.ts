import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [  LoggerModule.forRoot({
    pinoHttp: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    },
  }),ConfigModule.forRoot({
    isGlobal: true, // makes it accessible in any module without re-import
  }) ,   MongooseModule.forRoot(process.env.DB_URL),ProductsModule, AuthModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
