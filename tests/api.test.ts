import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import { Student } from '../src/models/Student';
import { Teacher } from '../src/models/Teacher';
import { Course } from '../src/models/Course';
import { Counter } from '../src/models/Counter';

const TEST_MONGO_URI = process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/school_test_db';

describe('School API End-to-End Tests', () => {

    before(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(TEST_MONGO_URI);
        }
    });

    after(async function () {
        this.timeout(10000);
        await Student.deleteMany({});
        await Teacher.deleteMany({});
        await Course.deleteMany({});
        await Counter.deleteMany({});
        await mongoose.disconnect();
    });

    let studentId: string;
    let teacherId: string;
    let courseId: string;

    it('should create a new student successfully', async () => {
        const res = await request(app).post('/students').send({
            name: "John Doe",
            age: 20,
            email: "john@example.com"
        });
        expect(res.status).to.equal(201);
        expect(res.body._id).to.contain('STU-');
        studentId = res.body._id;
    });

    it('should create a new teacher successfully', async () => {
        const res = await request(app).post('/teachers').send({
            name: "Dr. Smith",
            subject: "Science"
        });
        expect(res.status).to.equal(201);
        expect(res.body._id).to.contain('TCH-');
        teacherId = res.body._id;
    });

    it('should create a new course successfully', async () => {
        const res = await request(app).post('/courses').send({
            title: "Physics 101",
            code: "PHY-101",
            credits: 3
        });
        expect(res.status).to.equal(201);
        expect(res.body._id).to.contain('CRS-');
        courseId = res.body._id;
    });

    it('should enroll the student in the course', async () => {
        const res = await request(app)
            .post(`/courses/${courseId}/enroll`)
            .send({ studentId });
        expect(res.status).to.equal(200);
        expect(res.body.course.students).to.include(studentId);
    });

    it('should prevent enrolling the same student in the course twice', async () => {
        const res = await request(app)
            .post(`/courses/${courseId}/enroll`)
            .send({ studentId });
        expect(res.status).to.equal(400);
    });

    it('should assign the teacher to the course', async () => {
        const res = await request(app)
            .post(`/courses/${courseId}/assign-teacher`)
            .send({ teacherId });
        expect(res.status).to.equal(200);
        expect(res.body.course.teachers).to.include(teacherId);
    });

    it('should fail to create a student without a name', async () => {
        const res = await request(app).post('/students').send({
            age: 20,
            email: "nameless@example.com"
        });
        expect(res.status).to.equal(400);
    });

    

    it('should return 404 when enrolling a non-existent student', async () => {
        const fakeStudentId = 'STU-99999999';
        const res = await request(app)
            .post(`/courses/${courseId}/enroll`)
            .send({ studentId: fakeStudentId });
        expect(res.status).to.equal(404);
    });

    it('should return 404 when trying to delete a non-existent course', async () => {
        const fakeCourseId = 'CRS-99999999';
        const res = await request(app).delete(`/courses/${fakeCourseId}`);
        expect(res.status).to.equal(404);
    });

    it('should delete the course', async () => {
        let studentRes = await request(app).get(`/students/${studentId}`);
        const initialCourses = studentRes.body.enrolledCourses.map((c: any) => c._id);
        expect(initialCourses).to.include(courseId);

        const deleteRes = await request(app).delete(`/courses/${courseId}`);
        expect(deleteRes.status).to.equal(200);

        studentRes = await request(app).get(`/students/${studentId}`);
        const updatedCourses = studentRes.body.enrolledCourses.map((c: any) => c._id);
        expect(updatedCourses).to.not.include(courseId);
    });
});