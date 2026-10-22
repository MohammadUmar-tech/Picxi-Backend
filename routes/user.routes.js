import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getUser } from '../controllers/user.cotroller.js'
const router=express.Router()

router.get('/current',authMiddleware,getUser)

export default router