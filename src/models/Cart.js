import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import User from "./User";
import Item from "./Item";

const Cart = sequelize.define(
  'cart',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.NUMERIC(15,4),
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Cart.belongsTo(User, {
  as: 'user',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'userId',
    field: 'user_id',
    allowNull: false
  }
});

Cart.belongsTo(Item, {
  as: 'item',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'itemId',
    field: 'item_id',
    allowNull: false
  }
});

export default Cart;
