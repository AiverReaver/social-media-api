import { Router } from "express";
import { body } from "express-validator";
import { commentController } from "../controllers/CommentController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const commentRouter = Router();

commentRouter.post(
  "/comment/:postId",
  authMiddleware,
  [
    body("text")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Comment can't be empty"),
  ],
  commentController.create
);

export { commentRouter };
