import { Router } from "express";
import { body } from "express-validator";
import { postController } from "../controllers/PostController";
import { authMiddleware } from "../middlewares/authMiddleware";

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

postRouter.get("/posts/:id", postController.getPost);
postRouter.get("/all_posts", authMiddleware, postController.allPost);

export { postRouter };
