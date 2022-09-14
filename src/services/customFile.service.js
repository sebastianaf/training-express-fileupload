import boom from "@hapi/boom";
import fs from "fs";
import path from "path";
import errorCodes from "../config/errorCodes";
import paths from "../config/paths";

class CustomFileService {
  path = `${paths.base}customFiles/`;

  constructor() {}

  getExt = (file) => `${file.match(/\.[0-9a-z]+$/i)}`;
  filePath = (id) => path.join(__dirname, `../../${this.path}${id}`);

  async findOne(id) {
    if (!fs.existsSync(this.filePath(id))) {
      throw boom.notFound(errorCodes.NOT_FOUND.name, errorCodes.NOT_FOUND);
    }
    return this.filePath(id);
  }

  async create(files) {
    const file = files.file;
    await file.mv(`${this.path}${file.md5}${this.getExt(file.name)}`);
    return { fileRef: `${file.md5}${this.getExt(file.name)}` };
  }

  async update(id, files) {
    const obj = await this.findOne(id);
    fs.unlinkSync(obj);
    const create = await this.create(files);
    return create;
  }

  async delete(id) {
    const obj = await this.findOne(id);
    fs.unlinkSync(obj);
    return id;
  }
}

export default CustomFileService;
