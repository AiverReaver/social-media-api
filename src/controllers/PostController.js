import { validationResult } from "express-validator";
import model from "../models/";
import sequelize from "sequelize";

const { Post, Like, Comment, User } = model;
class PostController {
  async getPost(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);
      const likesCount = await Like.count({ where: { post_id: id } });
      const commentCount = await Comment.count({ where: { post_id: id } });
      if (!post) {
        return res.status(400).send({ message: "Post not found" });
      }

      res.status(200).send({
        data: {
          id: post.id,
          title: post.title,
          description: post.description,
          likesCount,
          commentCount,
        },
        message: "Post successfully fetched",
      });
    } catch (err) {
      res.status(500).send({ message: "something went wrong", err });
    }
  }

  async allPost(req, res) {
    try {
      const posts = await Post.findAll({
        where: { user_id: req.user.id },
        include: [
          { model: Like, as: "likes" },
          {
            model: Comment,
            as: "comments",
          },
        ],
        order: [["createdAt", "desc"]],
      });

      const postRes = posts.map((post) => {
        return {
          ...post.toJSON(),
          likes: undefined,
          likesCount: post.likes.length,
        };
      });

      res.status(200).send({
        data: postRes,
        message: "Post successfully fetched",
      });
    } catch (err) {
      res.status(500).send({ message: "something went wrong", err });
    }
  }

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
