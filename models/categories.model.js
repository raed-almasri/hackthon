import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

class Categories extends Model {}

Categories.init(
    {
        name: { type: DataTypes.STRING, allowNull: false },
        description: {
            allowNull: true,
            type: DataTypes.TEXT
        },
    },
    {
        sequelize,
        tableName: "categories",
        freezeTableName: true,
        timestamps: true,
        paranoid: false,
        updatedAt: false,
    }
);
export default Categories;
