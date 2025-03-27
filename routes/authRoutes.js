import express from 'express';
import authController from '../controller/authController.js';
import { validateUserCreation } from '../middleware/validation.js';

const router = express.Router();

// Endpoint para registrar un usuario
router.post('/register', validateUserCreation, authController.register);

// Endpoint para iniciar sesión
router.post('/login', validateUserCreation, authController.login);

export default router;