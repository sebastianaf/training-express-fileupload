import express from "express";

import CustomFileService from "../services/customFile.service";
import {
  getIdCustomFileSchema,
  postCustomFileSchema,
  patchCustomFileSchema,
} from "../schemas/customFile.schema";
import validatorHandler from "../middlewares/validator.handler";
import paths from "../config/paths";

const router = express.Router();
const service = new CustomFileService();

router.get(
  "/",
  validatorHandler(getIdCustomFileSchema, `query`),
  async (req, res, next) => {
    try {
      const result = await service.findOne(req.query._id);
      res.download(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(postCustomFileSchema, `files`),
  async (req, res, next) => {
    try {
      const result = await service.create(req.files);
      res.status(200).json({ statusCode: 200, error: null, data: result });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/",
  validatorHandler(getIdCustomFileSchema, `query`),
  validatorHandler(patchCustomFileSchema, `files`),
  async (req, res, next) => {
    try {
      const result = await service.update(req.query._id, req.files);
      res.status(200).json({ statusCode: 200, error: null, data: result });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/",
  validatorHandler(getIdCustomFileSchema, `query`),
  async (req, res, next) => {
    try {
      const result = await service.delete(req.query._id);
      res.status(200).json({ statusCode: 200, error: null, data: result });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
