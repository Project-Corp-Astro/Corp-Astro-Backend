import { Router } from 'express';
import employeeRoutes from './employeeRoutes';
import attendanceRoutes from './attendanceRoutes';
import { authenticateauthToken } from '../middleware/authenticateauthToken';







const routes = Router();
//routes.use('/user',userRouter)
routes.use('/createEmployee', employeeRoutes)
routes.use('/login', employeeRoutes)
routes.use('/attendance', authenticateauthToken, attendanceRoutes)

//routes.use('/getemployee', getAllEmployees)


export default routes;
