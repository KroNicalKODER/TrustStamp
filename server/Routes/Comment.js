import express from 'express'
import {createComment} from '../Controllers/Comment.js'
import getToken from '../getToken.js'

const router = express.Router()

router.post("/:id",getToken,createComment)

export default router;