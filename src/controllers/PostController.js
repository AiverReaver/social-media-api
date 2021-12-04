import { validationResult } from "express-validator";
import model from "../models/";

const { Post } = model;
class PostController {
  async create(req, res) {
    try {
      const { title, description } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      const post = await Post.create({
        title,
        description,
        user_id: req.user.id,
      });

      return res.status(201).send({
        message: "Post created",
        data: post,
      });
    } catch {
      res.status(500).send({ message: "something went wrong" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(400).send({ message: "Post not found" });
      }

      if (post.user_id !== req.user.id) {
        return res
          .status(401)
          .send({ message: "Not authorised to delete this post" });
      }

      await post.destroy();

      return res.status(200).send({ message: "Post deleted" });
    } catch {
      res.status(500).send({ message: "something went wrong" });
    }
  }
}

export const postController = new PostController();
