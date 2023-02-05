import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  name: String,
  userID: String,
  tag: [{ type: String }],
  categories: [{ type: String }],
  slug: { type: String },
  thumbnail: { type: String },
});

const post = mongoose.model("posts", postSchema);

export default post;
