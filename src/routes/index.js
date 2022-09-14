import express from "express";

/**
 * Import Routes
 */
import customFileRouter from "./customFile.route";

const routerAPI = (app) => {
  const router = express.Router();
  app.use("/api", router);

  /**
   * Routes
   */
  router.use("/customFile", customFileRouter);
};

export default routerAPI;
