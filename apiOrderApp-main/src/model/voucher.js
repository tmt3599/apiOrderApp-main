import sequelize from "sequelize";
import sequelizeInstance from "./index.js";

const Voucher = sequelizeInstance.define(
  "voucher",
  {
    id: {
      type: sequelize.UUIDV4(36),
      defaultValue: sequelize.UUIDV4(),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    title: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "title",
    },
    description: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "description",
    },
    type: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "type",
    },
    minOrder: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "minOrder",
    },
    minQuantity: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "minQuantity",
    },
    maxDiscount: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "maxDiscount",
    },
    discount: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "discount",
    },
    imgUrl: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "imgUrl",
    },
  },
  {
    tableName: "voucher",
  }
);

export default Voucher  ;
