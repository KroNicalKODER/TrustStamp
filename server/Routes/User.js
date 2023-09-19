import express from 'express'
import {update, del, get} from '../Controllers/user.js'
import getToken from '../getToken.js'

const router = express.Router()

//Update User Info
router.put('/:id',getToken,update)

//Delete Self Id
router.delete('/:id',getToken,del)

//Get a user
router.get('/find/:id',get)


export default router