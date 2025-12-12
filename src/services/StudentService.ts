import { Student } from '../models/Student';
import { Course } from '../models/Course';
import { generateId } from '../utils/idGenerator';

export const createStudent = async (data: any) => {
    const _id = await generateId('studentId', 'STU');
    const newStudent = new Student({ ...data, _id });
    return await newStudent.save();
};

export const getAllStudents = async () => {
    return await Student.find();
};

export const getStudentById = async (id: string) => {
    return await Student.findById(id).populate('enrolledCourses');
};

export const updateStudent = async (id: string, updateData: any) => {
    return await Student.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteStudent = async (id: string) => {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) return null;

    await Course.updateMany(
        { students: id },
        { $pull: { students: id } }
    );
    return deletedStudent;
};