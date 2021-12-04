import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      this.belongsTo(models.Post, { foreignKey: "post_id", as: "post" });
    }
  }
  Like.init(
    {
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
