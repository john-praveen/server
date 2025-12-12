import { Course } from '../models/Course';
import { Student } from '../models/Student';
import { Teacher } from '../models/Teacher';
import { generateId } from '../utils/idGenerator';

export const createCourse = async (data: any) => {
    const _id = await generateId('courseId', 'CRS');
    const newCourse = new Course({ ...data, _id });
    return await newCourse.save();
};

export const getAllCourses = async () => {
    return await Course.find();
};

export const getCourseById = async (id: string) => {
    return await Course.findById(id).populate('teachers').populate('students');
};

export const updateCourse = async (id: string, updateData: any) => {
    return await Course.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteCourse = async (id: string) => {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) return null;


    await Student.updateMany(
        { enrolledCourses: id },
        { $pull: { enrolledCourses: id } }
    );
    await Teacher.updateMany(
        { courses: id },
        { $pull: { courses: id } }
    );
    return deletedCourse;
};


export const unenrollCourse = async(courseId: string, studentId: string) =>{
    const course = await Course.findById(courseId);
    if (!course) throw new Error('Course not found'); 

    
    await Student.findByIdAndUpdate(studentId, {
        $pull: { enrolledCourses: courseId }
    });

    
    await Course.findByIdAndUpdate(courseId, {
        $pull: { students: studentId }
    });

    return await Course.findById(courseId);
};


export const enrollStudent = async (courseId: string, studentId: string) => {
    const course = await Course.findById(courseId);
    const student = await Student.findById(studentId);

    if (!course || !student) throw new Error('Course or Student not found');

    
    if (course.students.includes(studentId)) {
        throw new Error('Student is already enrolled in this course');
    }
    
    
    course.students.push(studentId);
    await course.save();
    
    if (!student.enrolledCourses.includes(courseId)) {
        student.enrolledCourses.push(courseId);
        await student.save();
    }
    return { course, student };
};


export const assignTeacher = async (courseId: string, teacherId: string) => {
    const course = await Course.findById(courseId);
    const teacher = await Teacher.findById(teacherId);

    if (!course || !teacher) throw new Error('Course or Teacher not found');

    
    if (course.teachers.includes(teacherId)) {
        throw new Error('Teacher is already assigned to this course');
    }

    course.teachers.push(teacherId);
    await course.save();

    if (!teacher.courses.includes(courseId)) {
        teacher.courses.push(courseId);
        await teacher.save();
    }
    return { course, teacher };
};