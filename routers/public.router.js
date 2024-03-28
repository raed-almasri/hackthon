import express from "express";
const router = express.Router();
import control from "../controllers/public.controller.js";
import { schema } from "../validation/schema/public.schema.js";
import { type, validate, execute } from "../config/header_routers.js";
import {publicLimit}from "../middleware/limit.js"
router.get(
	"/categories",
	validate(schema.empty, type.query),
	execute(control.categories)
);

//! projects
router.get(
    "/roads",
    publicLimit,
    // cacheMiddleware,
    validate(schema.query, type.query),
    execute(control.getAllRoadMaps)
);
router.get(
	"/:user_name",
	validate(schema.usernameCheck, type.params),
	execute(control.getUserProfile)
);

// router.get(
//     "/projects/:id",
//     publicLimit,
//     // cacheMiddleware,
//     validate(schema.language, type.query),
//     validate(schema.params, type.params),
//     execute(control.getProject)
// );

export default router;
