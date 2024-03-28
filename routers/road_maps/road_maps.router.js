import express from "express";
const router = express.Router();
import control from "../../controllers/admin/road_maps.admin.controller.js";
import { schema } from "../../validation/schema/road_maps/road_maps.schema.js";
import { auth, type, validate, execute } from "../../config/header_routers.js";
 
import blockApi from "./blocks.router.js";
  

router.post(
    "/",
    auth,
    validate(schema.body, type.body),
    validate(schema.empty, type.query),
    execute(control.create)
); 

router.put(
    "/:id",
    auth,
    validate(schema.params, type.params),
    validate(schema.body, type.body),
    validate(schema.empty, type.query),
    execute(control.update)
);

router.delete(
    "/:id",
    auth,
    validate(schema.params, type.params),
    validate(schema.empty, type.query),
    execute(control.remove)
);


router.get(
    "/",
    auth,
    
    execute(control.getAll)
); 

router.use("/blocks", blockApi); 
export default router;
