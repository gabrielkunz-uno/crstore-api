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
      field: 'promotional_price',
      type: DataTypes.NUMERIC(15,2)
    },  
    imageURL: {
      type: DataTypes.TEXT,
      field: 'image_url'
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
