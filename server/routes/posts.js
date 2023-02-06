import express from "express";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  AddLikeToPost,
  RemoveLikeFromPost,
  addCommentToPost,
  allComments,
  likeComment,
  replyComment,
  viewCount,
} from "../controllers/posts.js";
import Auth from "../middlewares/auth.js";
import { Upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", Auth, Upload, createPost);
router.patch("/:id", Auth, updatePost);
router.delete("/:id", Auth, deletePost);
router.put("/:id/like", AddLikeToPost);
router.delete("/:id/like", RemoveLikeFromPost);
router.get("/:id/comments", allComments);
router.post("/:id/comments", Auth, addCommentToPost);
router.patch("/:id/comments/:commentId/like", likeComment);
router.patch("/:id/comments/:commentId/reply", replyComment);
router.patch("/:id/viewcount", viewCount);

export default router;
