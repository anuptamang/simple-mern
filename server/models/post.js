import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  status: String,
  name: String,
  userID: String,
  likes: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const post = mongoose.model("posts", postSchema);

export default post;
