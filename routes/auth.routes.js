import express from 'express'
import { login, logOut, singUp } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
const router=express.Router()

router.post('/signup',singUp)
router.post('/signin',login)
router.get('/logout',authMiddleware,logOut)


export default router