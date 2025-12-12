import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School Management API',
      version: '1.0.0',
      description: 'API Documentation for Students, Teachers, and Courses',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Docker Server',
      },
    ],
    // --- SECURITY SETUP START ---
    components: {
      // 1. Define the Security Scheme (The "Lock")
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Student: {
          type: 'object',
          required: ['name', 'age', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            age: { type: 'integer', example: 20 },
            email: { type: 'string', example: 'john@example.com' },
            password: { type: 'string', example: 'secret123' }, // Added Password
          },
        },
        Teacher: {
            type: 'object',
            required: ['name', 'subject'],
            properties: {
              name: { type: 'string', example: 'Dr. Smith' },
              subject: { type: 'string', example: 'Physics' },
            },
          },
        Course: {
          type: 'object',
          required: ['title', 'code', 'credits'],
          properties: {
            title: { type: 'string', example: 'Physics 101' },
            code: { type: 'string', example: 'PHY-101' },
            credits: { type: 'integer', example: 3 },
          },
        },
      },
    },
    // 2. Enable Security Globally (The "Key")
    // This makes the green padlock appear next to every route
    security: [
      {
        bearerAuth: [],
      },
    ],
    // --- SECURITY SETUP END ---
  },
  apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);