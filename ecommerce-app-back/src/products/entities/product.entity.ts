import { Document } from 'mongoose';

export interface Product extends Document {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly availablePieces: number;
}