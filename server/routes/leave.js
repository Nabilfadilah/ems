import express from "express"
import AuthMiddleware from "../middleware/AuthMiddleware.js"
import { addLeave, getLeave } from "../controllers/LeaveController.js"

const router = express.Router()

router.get('/:id', AuthMiddleware, getLeave)
router.post('/add', AuthMiddleware, addLeave)

export default router