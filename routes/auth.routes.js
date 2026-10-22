import express from 'express'
import { login, logOut, resetPassword, sendOpt, singUp, verifyOtp } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
const router=express.Router()

router.post('/signup',singUp)
router.post('/signin',login)
router.get('/logout',authMiddleware,logOut)
router.post('/sendOpt',sendOpt)
router.post('/verifyOtp',verifyOtp)
router.post('/resetPassword',resetPassword)

export default router