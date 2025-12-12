import { Request, Response, NextFunction } from 'express';
import * as CourseService from '../services/CourseService';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const course = await CourseService.createCourse(req.body);
        res.status(201).json(course);
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await CourseService.getAllCourses();
        res.json(courses);
    } catch (error) {
        next(error);
    }
};

export const getOne = async (req: Request<{id : string}>, res: Response, next: NextFunction) => {
    try {
        const course = await CourseService.getCourseById(req.params.id);
        if (!course) throw new Error('Course not found');
        res.json(course);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request<{id : string}>, res: Response, next: NextFunction) => {
    try {
        const updatedCourse = await CourseService.updateCourse(req.params.id, req.body);
        if (!updatedCourse) throw new Error('Course not found');
        res.json(updatedCourse);
    } catch (error) {
        next(error);
    }
};

export const deleteOne = async (req: Request<{id : string}>, res: Response, next: NextFunction) => {
    try {
        const result = await CourseService.deleteCourse(req.params.id);
        if (!result) throw new Error('Course not found');
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const enrollStudent = async (req: Request<{id : string}>, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.body;
        if (!studentId) throw new Error('Student ID is required'); // Manual validation

        const result = await CourseService.enrollStudent(req.params.id, studentId);
        res.json(result);
    } catch (error) {
        next(error); // Middleware decides if it's 404 or 400
    }
};

export const unenrollStudent = async (req: Request<{id : string}>, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.body;
        if (!studentId) throw new Error('Student ID is required');

        const result = await CourseService.unenrollCourse(req.params.id, studentId);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const assignTeacher = async (req: Request<{id : string}>, res: Response, next: NextFunction) => {
    try {
        const { teacherId } = req.body;
        if (!teacherId) throw new Error('Teacher ID is required');

        const result = await CourseService.assignTeacher(req.params.id, teacherId);
        res.json(result);
    } catch (error) {
        next(error);
    }
};