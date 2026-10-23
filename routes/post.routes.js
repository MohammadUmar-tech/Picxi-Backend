import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'

import { upload } from '../config/multer.js'
import { comment, getAllPost, like, saved, uploadPost } from '../controllers/post.contorller.js'
const router=express.Router()

router.post('/upload',authMiddleware,upload.single('media'),uploadPost)
router.get('/getAllPost',authMiddleware,getAllPost)
router.get('/like/:postId',authMiddleware,like)
router.get('/save/:postId',authMiddleware,saved)
router.post('/comment',authMiddleware,comment)
export default router