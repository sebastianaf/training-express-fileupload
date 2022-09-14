import express, { application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import whitelist from "./config/whitelist";
import { morganOptions } from "./config/morgan";
import log from "./config/log";
import { logCheck } from "./tools/log";
import auth from "./middlewares/auth.handler";
import roles from "./middlewares/role.handler";
import routerAPI from "./routes";
import {
  logErrors,
  boomErrorHandler,
  errorHandler,
} from "./middlewares/error.handler";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import createFolders from "./tools/createFolders"

let app = express();
dotenv.config();
logCheck();
createFolders()

/***
 * Middlewares
 */
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed"));
    }
  },
};
app.use(cors(corsOptions));
app.use(auth);
app.use(roles);
app.use(helmet());
app.use(morgan(morganOptions));

parseInt(process.env.API_LOG) === 1 &&
  app.use(
    morgan(morganOptions, {
      stream: fs.createWriteStream(log.filePath, { flags: "a" }),
    })
  );

app.use(
  fileUpload({
    uploadTimeout: 60000, //default
  })
);

routerAPI(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(process.env.API_PORT, () => {
  console.log(`Running on port ${process.env.API_PORT}`);
});
