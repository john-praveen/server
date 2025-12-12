import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // 1. Log the specific error to your terminal so you can see it
    console.error("Error Caught:", err.message);

    // --- CASE A: Mongoose Validation Errors ---
    // Occurs if you try to save a Student without a Name, or Age is wrong type
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            type: "Validation Error",
            error: err.message
        });
    }

    // --- CASE B: MongoDB Duplicate Key Error ---
    // Occurs if you try to create a student with an ID or Email that exists (if unique: true)
    if (err.code === 11000) {
        return res.status(409).json({
            type: "Duplicate Error",
            error: "This record already exists."
        });
    }

    // --- CASE C: Custom Service Errors (Logic) ---
    // We convert the message to lowercase to make matching easier
    const message = err.message.toLowerCase();

    // 1. Catch "Not Found" errors
    // Covers: "Course not found", "Course or Student not found", "Course or Teacher not found"
    if (message.includes('not found')) {
        return res.status(404).json({
            type: "Not Found",
            error: err.message
        });
    }

    // 2. Catch Logic/Conflict Errors
    // Covers: "Student is already enrolled...", "Teacher is already assigned..."
    if (message.includes('already enrolled') || message.includes('already assigned')) {
        return res.status(400).json({
            type: "Bad Request",
            error: err.message
        });
    }

    // --- CASE D: Unknown/Server Crash ---
    // If it's none of the above, it's a crash (500)
    res.status(500).json({
        type: "Server Error",
        error: "Internal Server Error"
    });
};