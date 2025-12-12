import { Teacher } from '../models/Teacher';
import { Course } from '../models/Course';
import { generateId } from '../utils/idGenerator';

export const createTeacher = async (data: any) => {
    const _id = await generateId('teacherId', 'TCH');
    const newTeacher = new Teacher({ ...data, _id });
    return await newTeacher.save();
};

export const getAllTeachers = async () => {
    return await Teacher.find();
};

export const getTeacherById = async (id: string) => {
    return await Teacher.findById(id).populate('courses');
};

export const updateTeacher = async (id: string, updateData: any) => {
    return await Teacher.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteTeacher = async (id: string) => {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) return null;

    await Course.updateMany(
        { teachers: id },
        { $pull: { teachers: id } }
    );
    return deletedTeacher;
};