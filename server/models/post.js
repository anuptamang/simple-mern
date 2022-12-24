import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    name: String,
    userID: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const post = mongoose.model('posts', postSchema)

export default post