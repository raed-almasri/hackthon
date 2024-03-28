import dotenv from "dotenv";
dotenv.config({ path: `../.env` });
import { sequelize } from "../utils/connect.js";
import { DataTypes, Model } from "sequelize"; 

class RoadMaps extends Model {}

RoadMaps.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: { type: DataTypes.STRING, required: true },
		sharedBy: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		category: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
       
	},
	{
		freezeTableName: true,
		sequelize,
		tableName: "road_maps",
		timestamps: true,
		paranoid: false,
	}
);
export default RoadMaps;
