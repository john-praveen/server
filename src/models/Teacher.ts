import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Omit<Document, '_id'> {
    _id: string;
    name: string;
    subject: string;
    courses: string[];
}

const TeacherSchema = new Schema({
    _id: { type: String },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    courses: [{ type: String, ref: 'Course' }]
}, { _id: false });

export const Teacher = mongoose.model<ITeacher>('Teacher', TeacherSchema);