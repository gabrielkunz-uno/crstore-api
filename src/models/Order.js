import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Address from "./Address"
import PaymentMethod from "./PaymentMethod";
import ShippingOption from "./ShippingOption";
import Status from "./Status";
import User from "./User";

const Order = sequelize.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    total: {
      type: DataTypes.NUMERIC(15,2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    additionalInfo: {
      type: DataTypes.TEXT,
      field: 'additional_info'
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Order.belongsTo(User, {
  as: 'user',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'userId',
    field: 'user_id',
    allowNull: false
  }
});

Order.belongsTo(PaymentMethod, {
  as: 'paymentMethod',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'paymentMethodId',
    field: 'payment_method_id',
    allowNull: false
  }
});

Order.belongsTo(ShippingOption, {
  as: 'shippingOption',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'shippingOptionId',
    field: 'shipping_option_id',
    allowNull: false
  }
});

Order.belongsTo(Status, {
  as: 'status',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'statusId',
    field: 'status_id',
    allowNull: false
  }
});

Order.belongsTo(Address, {
  as: 'address',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'addressId',
    field: 'address_id',
    allowNull: true
  }
});

export default Order;
