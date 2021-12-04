import { Model } from "sequelize";

const PROTECTED_ATTRIBUTES = ["user_id", "updatedAt"];
export default (sequelize, DataTypes) => {
  class Post extends Model {
    toJSON() {
      const attributes = { ...this.get() };
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }

    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
