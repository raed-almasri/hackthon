import express from "express";
const router = express.Router();
import control from "../controllers/auth.controllers.js";
import { schema } from "../validation/schema/auth.schema.js";
import { auth, validate, type, execute } from "../config/header_routers.js";
import { limitLogin } from "../middleware/limit.js";

/*
 * @auth controllers
 * public
 * @method POST
 * @work login
 */
router.post(
    "/",
    limitLogin,
    validate(schema.logIn, type.body),
    execute(control.login)
);
router.put("/refresh", execute(control.refreshToken));


router.post(
    "/sign-up", 
    validate(schema.signUp, type.body),
    execute(control.singUp)
);

/*
 * @auth controllers
 * public
 * @method GET
 * @work logout
 */
router.get("/", auth, execute(control.logout));
export default router;



