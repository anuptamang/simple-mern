import express from 'express'

import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/posts.js'

import Auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', Auth, createPost)
router.patch('/:id', Auth, updatePost)
router.delete('/:id', Auth, deletePost)

export default router