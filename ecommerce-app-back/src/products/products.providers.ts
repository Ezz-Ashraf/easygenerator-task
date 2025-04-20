
import { Connection } from 'mongoose';
import { ProductSchema } from 'src/schemas/product.schema';
import { constants } from 'src/constants';

export const productsProviders = [
  {
    provide: constants.PRODUCT_MODEL,
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: [constants.DATABASE_CONNECTION],
  },
];
