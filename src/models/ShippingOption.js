import { DataTypes } from "sequelize";
import { sequelize } from "../config";

const ShippingOption = sequelize.define(
  'shipping_options',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'delivery' //pickup ou delivery
    },
    inactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default ShippingOption;
