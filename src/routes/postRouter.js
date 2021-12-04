import { Router } from "express";
import { body } from "express-validator";
import { postController } from "../controllers/PostController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const postRouter = Router();

postRouter.post(
  "/posts",
  authMiddleware,
  [
    body("title").trim().isLength({ min: 4 }).withMessage("Invalid title"),
    body("description")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Invalid description"),
  ],
  postController.create
);

postRouter.delete("/posts/:id", authMiddleware, postController.destroy);

export { postRouter };
