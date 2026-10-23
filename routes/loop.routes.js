import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
// import {uploadPost} from '../controllers/loop.contoller.js'
import { upload } from '../config/multer.js'
import { uploadLopp,like,comment,getAllLoop } from '../controllers/loop.contoller.js'
const router=express.Router()

router.post('/upload',authMiddleware,upload.single('media'),uploadLopp)
router.get('/getAllloop',authMiddleware,getAllLoop)
router.get('/like/:loopId',authMiddleware,like)
// router.get('/save/:postId',authMiddleware,saved)
router.post('/comment',authMiddleware,comment)
export default router