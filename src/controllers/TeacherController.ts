import { Request, Response, NextFunction } from 'express';
import * as TeacherService from '../services/TeacherService';
import { AuthRequest } from '../middleware/authMiddleware';

type TeacherParams = {
    id: string;
};

export const create = async (req:AuthRequest<TeacherParams>, res: Response, next: NextFunction) => {
    try {
        const teacher = await TeacherService.createTeacher(req.body);
        res.status(201).json(teacher);
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req: AuthRequest<TeacherParams>, res: Response, next: NextFunction) => {
    try {
        const teachers = await TeacherService.getAllTeachers();
        res.json(teachers);
    } catch (error) {
        next(error);
    }
};

export const getOne = async (req: AuthRequest<TeacherParams>, res: Response, next: NextFunction) => {
    try {
        const teacher = await TeacherService.getTeacherById(req.params.id);
        if (!teacher) throw new Error('Teacher not found');
        res.json(teacher);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: AuthRequest<TeacherParams>, res: Response, next: NextFunction) => {
    try {

        if (req.user._id !== req.params.id) {
            return res.status(403).json({ error: "Access Denied" });
        }

        const updatedTeacher = await TeacherService.updateTeacher(req.params.id, req.body);
        if (!updatedTeacher) throw new Error('Teacher not found');
        res.json(updatedTeacher);
    } catch (error) {
        next(error);
    }
};

export const deleteOne = async (req: AuthRequest<TeacherParams>, res: Response, next: NextFunction) => {
    try {

        if (req.user._id !== req.params.id) {
            return res.status(403).json({ error: "Access Denied" });
        }


        const result = await TeacherService.deleteTeacher(req.params.id);
        if (!result) throw new Error('Teacher not found');
        res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        next(error);
    }
};