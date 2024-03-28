import dotenv from "dotenv";
dotenv.config({ path: `../.env` });
import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize"; 
class Blocks extends Model {}

Blocks.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: { type: DataTypes.STRING, required: true },
		resources:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		color:{ 
			type: DataTypes.STRING,
			allowNull: true,
		},
		text_color:{ 
			type: DataTypes.STRING,
			allowNull: true,
		},
		road_map_id:{type:DataTypes.INTEGER,allowNull:false}
	},
	{
		freezeTableName: true,
		sequelize,
		tableName: "blocks",
		timestamps: true,
		paranoid: false,
	}
);
export default Blocks;
