import boom from "@hapi/boom";
import fs from "fs";
import path from "path";
import errorCodes from "../config/errorCodes";
import paths from "../config/paths";

class CustomFileService {
  path = `${paths.base}customFiles/`;

  constructor() {}

  getExt = (file) => {
    return `${file.match(/\.[0-9a-z]+$/i)}`;
  };

  async findOne(id) {
    const findPath = path.join(__dirname, `../../${this.path}${id}`);
    if (!fs.existsSync(findPath)) {
      console.log("Not found !!!!!!!!!!!!");
      console.log(findPath);
      throw boom.notFound(errorCodes.NOT_FOUND.name, errorCodes.NOT_FOUND);
    }
    return findPath;
  }

  async create(files) {
    const file = files.file;
    await file.mv(`${this.path}${file.md5}${this.getExt(file.name)}`);
    return { fileRef: `${file.md5}${this.getExt(file.name)}` };
  }

  async update(id, file) {
    return {};
  }

  async delete(id) {
    return {};
  }
}

export default CustomFileService;
