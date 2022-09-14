import mongoose from "mongoose";
const { Schema } = mongoose;

const AccessSchema = new Schema(
  {
    pathname: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    POST: {
      type: Array,
      default: ["admin"],
    },
    GET: {
      type: Array,
      default: ["admin"],
    },
    PATCH: {
      type: Array,
      default: ["admin"],
    },
    DELETE: {
      type: Array,
      default: ["admin"],
    },
  },
  { strict: true }
);

AccessSchema.index({ pathname: 1 }, { unique: true });

export { AccessSchema };
