import fs from "fs";
import paths from "../config/paths";

const createFolders = () => {
  try {
    paths.routeFolders.map((e) => {
      const path = `${paths.base}${e}`;
      !fs.existsSync(path) && fs.mkdirSync(path, { recursive: true });
    });
  } catch (error) {
    console.log(`Create folders... FAIL`);
  }
};

export default createFolders;
