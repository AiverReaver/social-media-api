import { Model } from "sequelize";

const PROTECTED_ATTRIBUTES = ["user_id", "post_id"];
export default (sequelize, DataTypes) => {
  class Comment extends Model {
    toJSON() {
      const attributes = { ...this.get() };
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id", as: "postedBy" });
      this.belongsTo(models.Post, { foreignKey: "post_id", as: "post" });
    }
  }
  Comment.init(
    {
      text: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
