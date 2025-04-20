import { Document } from 'mongoose';

export interface Order extends Document {
  productIds: { product: string; quantity: number }[];
  totalPrice: number;
  user: string; // Reference to the user making the order
  createdAt: Date;
  updatedAt: Date;
}