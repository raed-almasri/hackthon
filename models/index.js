import RefreshToken from "./refresh_token.model.js";
import Users from "./user.model.js";
import RoadMaps from "./road_maps.model.js";
import Categories from "./categories.model.js";
import BlockImages from "./block_Images.model.js";
import Blocks from "./blocks.model.js";

Users.hasMany(RefreshToken, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "refreshTokens",
	foreignKey: "u_id",
});
RefreshToken.belongsTo(Users, { foreignKey: "u_id", as: "userInfo" });

// ! Categories
Categories.hasMany(RoadMaps, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "road_maps",
	foreignKey: "category",
});
RoadMaps.belongsTo(Categories, { foreignKey: "category", as: "categoryInfo" });

// ! user with road maps
Users.hasMany(RoadMaps, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "road_maps_user",
	foreignKey: "sharedBy",
});
RoadMaps.belongsTo(Users, { foreignKey: "sharedBy", as: "user_info" });

// ! blocks
Blocks.hasMany(BlockImages, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "images",
	foreignKey: "block_id",
});
BlockImages.belongsTo(Blocks, { foreignKey: "block_id", as: "block_info" });


 
RoadMaps.hasMany(Blocks, {
	constraints: true,
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
	hooks: true,
	as: "road_map_blocks",
	foreignKey: "road_map_id",
});
Blocks.belongsTo(RoadMaps, { foreignKey: "road_map_id", as: "block_info" });

// -------------------------------------------------------------------

export { RefreshToken, Users, RoadMaps, BlockImages, Blocks, Categories };
