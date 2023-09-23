import Comments from "../Models/Comments.js"
import User from "../models/User.js"
import Posts from "../Models/Posts.js"

import genError from '../error.js'

const createComment = async(req,res,next) => {
    const newComment = new Comments({
        userId : req.user.id,
        postId : req.params.id,
        ...req.body
    })

    try {
        const savedComment = await Comments.save()
        await Posts.findByIdAndUpdate(req.params.id,{
            // !! Watch this */
        })
        res.status(200).json("Comment Saved...")
    } catch (error) {
        next(error)
    }

}