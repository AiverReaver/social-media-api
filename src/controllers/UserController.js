import model from "../models/";

const { User } = model;
class UserController {
  async getUserInfo(req, res) {
    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const following = await user.getFollowing();
      const followers = await user.getFollowers();

      return res.status(200).send({
        message: "User data fetched",
        data: {
          user: {
            name: user.name,
            followerCount: followers.length,
            followingCount: following.length,
          },
        },
      });
    } catch (err) {
      res.status(500).send({ message: "something went wrong" });
    }
  }
}

export const userController = new UserController();
