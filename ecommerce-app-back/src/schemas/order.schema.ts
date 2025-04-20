import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // refers to the Products collection
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});
