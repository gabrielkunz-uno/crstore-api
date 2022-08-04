import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Category from "./Category";

const Item = sequelize.define(
  'items',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    additionalInfo: {
      type: DataTypes.TEXT,
      field: 'additional_info'
    },
    price: {
      type: DataTypes.NUMERIC(15,2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    promotional: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    promotionalPrice: {
      type: DataTypes.NUMERIC(15,2),
      field: 'promotional_price'
    },  
    imageURL: {
      type: DataTypes.TEXT,
      field: 'image_url'
    },
    stockAvailable: {
      type: DataTypes.NUMERIC(15,4),
      allowNull: false,
      validate: {
        min: 0
      },
      field: 'stock_available'
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

Item.belongsTo(Category, {
  as: 'category',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'categoryId',
    field: 'category_id',
    allowNull: false
  }
});

export default Item;
