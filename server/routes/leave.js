import express from "express"
import AuthMiddleware from "../middleware/AuthMiddleware.js"
import { addLeave, getLeave, getLeaves } from "../controllers/LeaveController.js"

const router = express.Router()

router.get('/:id', AuthMiddleware, getLeave)
router.post('/add', AuthMiddleware, addLeave)
router.get('/', AuthMiddleware, getLeaves)

export default router