import express from "express"
import AuthMiddleware from "../middleware/AuthMiddleware.js"
import { addSalary } from "../controllers/SalaryController.js"

const router = express.Router()

router.post('/add', AuthMiddleware, addSalary)

export default router