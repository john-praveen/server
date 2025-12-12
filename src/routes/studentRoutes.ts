import { Router } from 'express';
import * as StudentController from '../controllers/StudentController';
import { authenticate } from '../middleware/authMiddleware'; 
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Students
 *     description: Student management
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized (Token missing)
 *   post:
 *     summary: Create a new student (Admin route)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
// 3. Protect the Routes
router.get('/', authenticate, StudentController.getAll);
router.post('/', authenticate, StudentController.create);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student data
 *       404:
 *         description: Not Found
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticate, StudentController.getOne);
router.put('/:id', authenticate, StudentController.update);
router.delete('/:id', authenticate, StudentController.deleteOne);

export default router;