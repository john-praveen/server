import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Omit<Document, '_id'>  {
    _id: string;
    name: string;
    age: number;
    email: string;
    password?: string;
    role?: string;
    enrolledCourses: string[];
}

const StudentSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Encrypted password
    role: { type: String, default: 'student' },
    enrolledCourses: [{ type: String, ref: 'Course' }]
}, { 
    _id: false,
    versionKey: false 
});

export const Student = mongoose.model<IStudent>('Student', StudentSchema);