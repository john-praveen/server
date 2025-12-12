import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Student } from '../models/Student';
import { generateId } from '../utils/idGenerator';

const JWT_SECRET = 'secret_key_123';


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, age, email, password } = req.body;

      
        const existing = await Student.findOne({ email });
        if (existing) return res.status(400).json({ error: "Email already exists" });

        
        const hashedPassword = await bcrypt.hash(password, 10);
        const _id = await generateId('studentId', 'STU');

        const newStudent = new Student({
            _id, name, age, email, password: hashedPassword, role: 'student'
        });

        await newStudent.save();
        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        next(error);
    }
};


export const login= async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

      
        const student = await Student.findOne({ email });
        if (!student) return res.status(400).json({ error: "Invalid email or password" });

       
        const validPass = await bcrypt.compare(password, student.password as string);
        if (!validPass) return res.status(400).json({ error: "Invalid email or password" });

        
        const token = jwt.sign(
            { _id: student._id, role: student.role }, 
            JWT_SECRET,
            { expiresIn: '1h' } 
        );

        res.json({ token });
    } catch (error) {
        next(error);
    }
};