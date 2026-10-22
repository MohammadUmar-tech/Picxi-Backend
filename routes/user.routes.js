import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { editProfile, getProfile, getSuggestedUser, getUser } from '../controllers/user.cotroller.js'
import { upload } from '../config/multer.js'
const router=express.Router()

router.get('/current',authMiddleware,getUser)
router.get('/suggest',authMiddleware,getSuggestedUser)
router.get('/profile/:userName',authMiddleware,getProfile)
router.post('/editProfile',authMiddleware,upload.single("profileImage"),editProfile)
export default router