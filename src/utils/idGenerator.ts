import { Counter } from '../models/Counter';

export const generateId = async (key: string, prefix: string): Promise<string> => {
    const counter = await Counter.findByIdAndUpdate(
        key,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return `${prefix}-${counter.seq.toString().padStart(3, '0')}`;
};