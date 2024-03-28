import express from "express";
const router = express.Router();
import control from "../../controllers/admin/blocks.admin.controller.js";
import { schema } from "../../validation/schema/road_maps/blocks.schema.js";
import { auth, type, validate, execute } from "../../config/header_routers.js";
import { uploadImage } from "../../middleware/uploadImage.js";

router.post(
    "/upload/:id",
    auth,
    validate(schema.params, type.params),
    validate(schema.empty, type.query),
    uploadImage("image", "multi"),
    execute(control.upload)
);
router.delete(
    "/deleteImage/:id",
    auth,
    validate(schema.params, type.params),
    validate(schema.empty, type.query),
    execute(control.deleteImage)
);

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
    "/:id",
    auth,
    validate(schema.params, type.params),
    execute(control.getAll)
); 
export default router;

 