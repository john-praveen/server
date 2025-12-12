import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'; 
import { swaggerSpec } from './swagger';

// --- IMPORTS ---
import authRoutes from './routes/authRoutes';       // <--- 1. Import Auth Routes
import courseRoutes from './routes/courseRoutes';
import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';

import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// --- BASIC MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- SWAGGER ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- LOGGER ---
app.use(requestLogger);

// --- ROUTES ---
app.use('/auth', authRoutes);         // <--- 2. Register Auth Routes
app.use('/courses', courseRoutes);
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

// --- ERROR HANDLER (Must be last) ---
app.use(errorHandler);

export default app;