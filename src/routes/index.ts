import { Router } from 'express';
import { authenticateauthToken } from '../middleware/authenticateauthToken';
import chartrouter from './chartRoutes';
import authrouter from './authRoutes';
import authMiddleware from '../middleware/authMiddleware';








const routes = Router();
routes.use('/chart',authMiddleware, chartrouter )
routes.use('/auth', authrouter )


export default routes;
