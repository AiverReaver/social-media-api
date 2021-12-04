import { Model } from "sequelize";

const PROTECTED_ATTRIBUTES = ["password"];
export default (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      const attributes = { ...this.get() };
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }

    static associate(models) {
      this.hasMany(models.Follower, {
        foreignKey: "user_by",
        as: "following",
      });
      this.hasMany(models.Follower, {
        foreignKey: "user_to",
        as: "followers",
      });
      this.hasMany(models.Post, {
        foreignKey: "user_id",
        as: "posts",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
