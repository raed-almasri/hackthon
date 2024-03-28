import express from "express";
const router = express.Router();
import authApi from "./auth.router.js";
 
import accountApi from "./account.router.js";

import roadMaps from "./road_maps/road_maps.router.js";
import publicApi from "./public.router.js";
import { StatusCodes } from "http-status-codes";

router.use("/auth", authApi);
router.use("/road-maps", roadMaps);
router.use("/account",accountApi)
router.use("/", publicApi);

router.use("*", (req, res) => {
	res
		.status(StatusCodes.NOT_FOUND)
		.send({ success: false, message: "Error 404 not found page" });
});
export default router;
