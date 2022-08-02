import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Order from "./Order";
import Item from "./Item";

const OrderItems = sequelize.define(
  'order_items',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.NUMERIC(15,4),
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMERIC(15,2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    total: {
      type: DataTypes.NUMERIC(15,2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Order.belongsToMany(Item, { 
  through: OrderItems,
  as: 'items',
  foreignKey: {
    name: 'orderId',
    field: 'order_id',
    allowNull: false
  } 
});

Item.belongsToMany(Order, {
  through: OrderItems,
  as: 'order',
  foreignKey: {
    name: 'itemId',
    field: 'item_id',
    allowNull: false
  }
});

export default OrderItems;
