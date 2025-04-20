import { Connection } from 'mongoose';
import { ProductSchema } from 'src/schemas/product.schema';
import { constants } from 'src/constants';
import { OrderSchema } from 'src/schemas/order.schema';

export const ordersProviders = [
  {
    provide: constants.ORDER_MODEL,
    useFactory: (connection: Connection) => connection.model('Order', OrderSchema),
    inject: [constants.DATABASE_CONNECTION],
  },
];
