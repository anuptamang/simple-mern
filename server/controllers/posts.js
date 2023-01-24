import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import Post from "../models/post.js";
import User from "../models/user.js";

const PORT = process.env.PORT || 3010;

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 15;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Post.countDocuments({});
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createPost = async (req, res) => {
  if (req.file == undefined) {
    return res.json({ message: "Error: No File Selected!" });
  }

  const { title, body, tag, categories, slug } = req.body;
  const fullUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

  const newPost = new Post({
    userID: req.userId,
    createdAt: new Date().toISOString(),
    title,
    body,
    tag,
    categories,
    slug,
    thumbnail: fullUrl,
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that ID");
  const updatedPost = await Post.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");
  await Post.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export const AddLikeToPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.likes = post.likes + 1;
  await post.save();

  return res.json(post);
};

export const RemoveLikeFromPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.likes = post.likes - 1;
  if (post.likes < 0) {
    post.likes = 0;
  }
  await post.save();

  return res.json(post);
};

export const addCommentToPost = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    let userId = req.body.userId;
    if (!user) {
      userId = "ghost";
    }
    const post = await Post.findById(req.params.id);
    post.comments.push({ text: req.body.text, userId: userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
};

export const allComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(201).json(post.comments);
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
};

export const likeComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.id(req.params.commentId);
    comment.likes++;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: "Comment not found" });
  }
};

export const replyComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.id(req.params.commentId);
    comment.replies.push(req.body.text);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: "Comment not found" });
  }
};

export const viewCount = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    post.views++;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
};
