import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Order from "./Order";
import Status from "./Status";

const OrderStatus = sequelize.define(
  'order_status',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Order.belongsToMany(Status, { 
  through: OrderStatus, //tabela/modelo associativa
  as: 'allStatus', //'Livros'
  foreignKey: {
    name: 'orderId',
    field: 'order_id',
    allowNull: false
  } 
});

Status.belongsToMany(Order, {
  through: OrderStatus,
  as: 'order',
  foreignKey: {
    name: 'statusId',
    field: 'status_id',
    allowNull: false
  }
});

export default OrderStatus;
