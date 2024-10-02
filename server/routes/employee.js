import express from "express"
import AuthMiddleware from "../middleware/AuthMiddleware.js"
import { addEmployee, upload } from "../controllers/EmployeeController.js"

const router = express.Router()

// router.get('/', AuthMiddleware, getDepartments)
router.post('/add', AuthMiddleware, upload.single('image') ,addEmployee)
// router.get('/:id', AuthMiddleware, getDepartment)
// router.put('/:id', AuthMiddleware, updateDepartment)
// router.delete('/:id', AuthMiddleware, deleteDepartment)

export default router