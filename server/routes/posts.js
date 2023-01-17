import express from "express";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  AddLikeToPost,
  RemoveLikeFromPost,
} from "../controllers/posts.js";

import Auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", Auth, createPost);
router.patch("/:id", Auth, updatePost);
router.delete("/:id", Auth, deletePost);
router.put("/:id/like", AddLikeToPost);
router.delete("/:id/like", RemoveLikeFromPost);

export default router;
