import { Document } from 'mongoose';


export interface User extends Document {
    readonly id: string;
    readonly name: string;
    readonly email: number;
    readonly password:string
}