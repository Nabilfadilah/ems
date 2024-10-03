import express from "express"
import AuthMiddleware from "../middleware/AuthMiddleware.js"
import { addEmployee, getEmployee, getEmployees, updateEmployee, upload, fecthEmployeesByDepId } from "../controllers/EmployeeController.js"

const router = express.Router()

router.get('/', AuthMiddleware, getEmployees)
router.post('/add', AuthMiddleware, upload.single('image') ,addEmployee)
router.get('/:id', AuthMiddleware, getEmployee)
router.put('/:id', AuthMiddleware, updateEmployee)
router.get('/department/:id', AuthMiddleware, fecthEmployeesByDepId)

export default router