import express from "express"
import AuthMiddleware from "../middleware/AuthMiddleware.js"
import { addLeave, getLeave, getLeaveDetail, getLeaves, updateLeave } from "../controllers/LeaveController.js"

const router = express.Router()

router.get('/', AuthMiddleware, getLeaves)
router.get('/:id/:role', AuthMiddleware, getLeave)
router.get('/view/:id', AuthMiddleware, getLeaveDetail)
router.post('/add', AuthMiddleware, addLeave)
router.put('/:id', AuthMiddleware, updateLeave)

export default router