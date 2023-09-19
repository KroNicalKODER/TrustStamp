import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import genErr from '../error.js'

export const register = async (req,res,next) => {
    console.log(req.body)
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(req.body.password,salt)
        const newUser = new User({...req.body, password: hashPassword})

        await newUser.save()
        res.status(200).send("User Created successfully")
    } catch (error) {
        next(error)
    }
}

export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user) next(genErr(404,"User Not Found"))
        if(!bcrypt.compareSync(req.body.password,user.password)) next(genErr(401,"Invalid Password"))
        const token = jwt.sign({id:user._id}, process.env.JWT)

        const {password,...withoutPassword} = user._doc
        res.cookie("access_token",token, {
            httpOnly: true
        }).status(200).json(withoutPassword)
        
    } catch (error) {
        next(error)
    }
}
