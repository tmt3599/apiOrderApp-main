import sequelize from "sequelize";
import sequelizeInstance from "./index.js";

const UserVoucher = sequelizeInstance.define(
  "userVoucher",
  {
    id: {
      type: sequelize.UUIDV4(36),
      defaultValue: sequelize.UUIDV4(),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    userId: {
      type: sequelize.STRING(36),
      allowNull: false,
      field: "userId",
    },
    voucherId: {
      type: sequelize.STRING(36),
      allowNull: false,
      field: "voucherId",
    },
    expired: {
      type: sequelize.TIME(),
      allowNull: true,
      field: "expired",
    },
  },
  {
    tableName: "userVoucher",
  }
);

export default UserVoucher  ;
