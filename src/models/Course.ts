import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Omit<Document, '_id'> {
    _id: string;
    title: string;
    code : string;
    credits: number;
    teachers: string[];
    students: string[];
}

const CourseSchema = new Schema({
    _id: { type: String },
    title: { type: String, required: true },
    credits: { type: Number, required: true },
    code : {type:String, rewuired: true},
    teachers: [{ type: String, ref: 'Teacher' }],
    students: [{ type: String, ref: 'Student' }]
}, { _id: false });

export const Course = mongoose.model<ICourse>('Course', CourseSchema);