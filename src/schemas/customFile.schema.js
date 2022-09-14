import Joi from "joi";

const _id = Joi.string().pattern(/^[a-f0-9]{32}\.[0-9a-z]+$/);
const file = Joi.object().keys({
  name: Joi.string().required(),
  data: Joi.binary(),
  size: Joi.number().max(5000000).required(),
  encoding: Joi.string().allow("").required(),
  tempFilePath: Joi.string().allow(""),
  truncated: Joi.boolean().required(),
  mimetype: "application/pdf",
  md5: Joi.string()
    .pattern(/^[a-f0-9]{32}$/).allow("")
    .required(),
  mv: Joi.any().required(),
});

const getIdCustomFileSchema = Joi.object({
  _id: _id.required(),
});

const getIdQueryCustomFileSchema = Joi.object({
  _id,
});

const postCustomFileSchema = Joi.object({
  file,
});

const patchCustomFileSchema = Joi.object({
  file,
});

export {
  getIdQueryCustomFileSchema,
  getIdCustomFileSchema,
  postCustomFileSchema,
  patchCustomFileSchema,
};
