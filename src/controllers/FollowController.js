import { Op } from "sequelize";
import model from "../models/";

const { User, Follower } = model;
class FollowerController {
  async follow(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      if (user.id === req.user.id) {
        return res.status(400).send({ message: "Can't follow self" });
      }

      const follower = await Follower.findOne({
        where: { [Op.and]: [{ user_to: user.id }, { user_by: req.user.id }] },
      });

      if (follower) {
        return res.status(400).send({ message: "Already following" });
      }

      await Follower.create({
        user_by: req.user.id,
        user_to: user.id,
      });
      return res.status(200).send({ message: "" });
    } catch (err) {
      res.status(500).send({ message: "something went wrong" });
    }
  }

  async unFollow(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      if (user.id === req.user.id) {
        return res.status(400).send({ message: "Can't unfollow self" });
      }

      const follower = await Follower.findOne({
        where: { [Op.and]: [{ user_to: user.id }, { user_by: req.user.id }] },
      });

      if (!follower) {
        return res.status(400).send({ message: "Can't unfollow" });
      }

      await follower.destroy();

      return res.status(200).send({ message: "Successfully Unfollowed" });
    } catch (err) {
      res.status(500).send({ message: "something went wrong" });
    }
  }
}

export const followerController = new FollowerController();
