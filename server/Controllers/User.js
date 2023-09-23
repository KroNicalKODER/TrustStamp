import User from "../models/User.js"
import genError from "../error.js"
import Post from "../Models/Posts.js"

export const update = async (req,res,next) => {
    if(req.params.id === req.user.id){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },{new : true})
            res.status(200).json(updatedUser)
        } catch (error) {
            next(genError(error))
        }
    }else {
        next(genError(403,"User can Update only its own account"))
    }

}

export const del = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            res.status(200).json(deletedUser)
        } catch (error) {
            next(genError(error))
        }
    } else {
        next(genError(403,"User can Delete only its own account"))
    }
}

export const get = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        if(user){
            res.status(200).json(user)
        }else {
            next(genError(404,"User not found"))
        }
    } catch (error) {
        next(genError(error))
    }
}

export const save = async(req,res,next)=> {
    try {
        const postId = req.params.id
        const userId = req.user.id
        User.findByIdAndUpdate(userId,{
            $push : {savedPost : postId}
        })
    } catch (error) {
        next(genError(error))
    }
}

export const like = async(req,res,next) => {
    const id = req.user.id
    const postId = req.params.id
    try {
        const post = await Post.findByIdAndUpdate(postId,{
            $push: {likedBy: id},
        })
        if(!post){
            res.status(403).json("Post Not Found");
        }else{
            res.status(200).json("Like Added");
        }
    } catch (error) {
        next(error)
    }
}

export const follow = async (req,res,next) => {
    try {
        const user = User.findById(req.user.id)
        if(!user){
            next(genError(404,"User Not Found"))
        }
        await User.findByIdAndUpdate(req.user.id,{
            $push: {following : req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $push: {followers : req.user.id}
        })
        res.status(200).json("Now following")
    } catch (error) {
        next(error)
    }
}