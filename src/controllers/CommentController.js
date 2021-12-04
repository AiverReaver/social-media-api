import { validationResult } from "express-validator";
import model from "../models";

const { Comment } = model;
class CommentController {
  async create(req, res) {
    try {
      const { postId } = req.params;
      const { text } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }

      const comment = await Comment.create({
        text,
        post_id: postId,
        user_id: req.user.id,
      });

      res
        .status(201)
        .send({ message: "Comment created", data: { commentId: comment.id } });
    } catch (err) {
      res.status(500).send({ message: "something went wrong", err });
    }
  }
}

export const commentController = new CommentController();
