import express from 'express'
import {update, del, get, save, follow, like} from '../Controllers/user.js'
import getToken from '../getToken.js'

const router = express.Router()

//Update User Info
router.put('/:id',getToken,update)

//Delete Self Id
router.delete('/:id',getToken,del)

//Get a user
router.get('/find/:id',get)

//Save a Post
router.put('/save/:id', getToken, save)

//Follow
router.put('/follow/:id', getToken, follow)

//Like
router.put('/like/:id',getToken,like)

export default router