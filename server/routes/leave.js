import express from "express"
import AuthMiddleware from "../middleware/AuthMiddleware.js"
import { addLeave } from "../controllers/LeaveController.js"

const router = express.Router()

// router.get('/', AuthMiddleware, addLeave)
router.post('/add', AuthMiddleware, addLeave)

export default router