import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
    },
    email:{
        type: String,
    },
    password: {
        type: String,
    },
    posts :{
        type: [String]
    },
    savedPost: {
        type: [String]
    },
    followers: {
        type:[String],
    },
    following: {
        type:[String],
    },
    
    reportedBy: {
        type: [String],
    }
},
{
    timestamps:true
})

export default mongoose.model('user', UserSchema)