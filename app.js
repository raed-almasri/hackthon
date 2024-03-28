import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import expressSanitizer from "express-sanitizer";
import cookieParser from "cookie-parser";
import path from "path"; 
import logRegisterConfig from "./config/log.js";
import corsConfig from "./config/cors.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { limit } from "./middleware/limit.js";
// Protection
import xss from "xss-clean";
import expectCt from "expect-ct";
import compression from "compression";
import helmet from "./config/helmet.js";
import sessionConfig from "./config/sessionConfig.js";
// import csurfProtection from "./config/csurf.js";
 
// **************** 
 
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swaggerConfig.js'

import router from "./routers/router.js";
const app = express();
// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
 

app.use(limit);
dotenv.config({ path: `.env` });
app.use(cookieParser());
app.use(bodyParser.json({ limit: "20kb" }));

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array("image", 4));
const publicDirectoryPath = path.join(path.resolve(), "./images");
app.use("/images", express.static(publicDirectoryPath));
app.use(expressSanitizer());

corsConfig(app);

helmet(app);

// badInputConfig(app);
logRegisterConfig(app);
app.use(sessionConfig);

app.use(xss());
app.use(expectCt({ enforce: true, maxAge: 123, reportUri: process.env.lINK }));
app.use(compression());

app.use(router);

app.use(errorHandler);
export default app;

 





