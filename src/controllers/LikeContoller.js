import { Op } from "sequelize/dist";
import model from "../models";

const { Like, Post } = model;

class LikeController {
  async likePost(req, res) {
    try {
      const { postId } = req.params;

      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(400).send({ message: "Post not found" });
      }

      const like = await Like.findOne({
        where: { [Op.and]: [{ user_id: req.user.id }, { post_id: postId }] },
      });

      if (like) {
        return res.status(400).send({ message: "Post already liked" });
      }

      await Like.create({
        user_id: req.user.id,
        post_id: postId,
      });

      return res.status(200).send({ message: "Post Liked" });
    } catch {
      res.status(500).send({ message: "something went wrong" });
    }
  }

  async unlikePost(req, res) {
    try {
      const { postId } = req.params;

      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(400).send({ message: "Post not found" });
      }

      const like = await Like.findOne({
        where: { [Op.and]: [{ user_id: req.user.id }, { post_id: postId }] },
      });

      if (!like) {
        return res
          .status(400)
          .send({ message: "You have to like the post first" });
      }

      await like.destroy();

      return res.status(200).send({ message: "Post UnLiked" });
    } catch {
      res.status(500).send({ message: "something went wrong" });
    }
  }
}

export const likeController = new LikeController();
