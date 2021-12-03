import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Follower extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_by",
        through: "followers",
        as: "followedBy",
      });

      this.belongsTo(models.User, {
        foreignKey: "user_to",
        through: "followers",
        as: "followes",
      });
    }
  }
  Follower.init(
    {
      user_to: DataTypes.INTEGER,
      user_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Follower",
    }
  );
  return Follower;
};
