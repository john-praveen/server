import mongoose, { Schema, Document } from 'mongoose';

export interface ICounter extends Omit<Document, '_id'> {
    _id: string;
    seq: number;
}
const CounterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

export const Counter = mongoose.model<ICounter>('Counter', CounterSchema);