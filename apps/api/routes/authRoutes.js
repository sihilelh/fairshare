import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';

const authRouter = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
authRouter.post('/register', validateRegister, authController.register);

/**
 * POST /api/auth/login
 * Login an existing user
 */
authRouter.post('/login', validateLogin, authController.login);

export default authRouter;
