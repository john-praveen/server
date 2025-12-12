import { Request, Response, NextFunction } from 'express'; 
import * as StudentService from '../services/StudentService';
import { AuthRequest } from '../middleware/authMiddleware';

type StudentParams = {
    id: string;
};



export const create = async (req: AuthRequest<StudentParams>, res: Response, next: NextFunction) => {
    try {
        const student = await StudentService.createStudent(req.body);
        res.status(201).json(student);
    } catch (error) {
        next(error); 
    }
};

export const getAll = async (req: AuthRequest<StudentParams>, res: Response, next: NextFunction) => {
    try {
        const students = await StudentService.getAllStudents();
        res.json(students);
    } catch (error) {
        next(error);
    }
};

export const getOne = async (req: AuthRequest<StudentParams>, res: Response, next: NextFunction) => {
    try {
        const student = await StudentService.getStudentById(req.params.id);
        if (!student) throw new Error('Student not found'); 
        res.json(student);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: AuthRequest<StudentParams>, res: Response, next: NextFunction) => {
    try {

        if (req.user._id !== req.params.id) {
            return res.status(403).json({ error: "Access Denied" });
        }

        const updatedStudent = await StudentService.updateStudent(req.params.id, req.body);
        if (!updatedStudent) throw new Error('Student not found');
        res.json(updatedStudent);
    } catch (error) {
        next(error);
    }
};

export const deleteOne = async (req: AuthRequest<StudentParams>, res: Response, next: NextFunction) => {
    try {

        if (req.user._id !== req.params.id) {
            return res.status(403).json({ error: "Access Denied" });
        }

        const result = await StudentService.deleteStudent(req.params.id);
        if (!result) throw new Error('Student not found');
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        next(error);
    }
};