import CryptoJS from "crypto-js";
import { AES, SHA256 } from "crypto-js";
import jwt from "jsonwebtoken";
require("dotenv").config();

const decrypt = (token) => {
  let decryptedToken = AES.decrypt(
    token,
    SHA256(process.env.API_TOKEN_SIGN).toString()
  ).toString(CryptoJS.enc.Utf8);
  const freshToken = jwt.verify(`${decryptedToken}`, process.env.API_TOKEN_SIGN);
  if (freshToken) {
    return jwt.decode(`${decryptedToken}`, process.env.API_TOKEN_SIGN);
  }
  return undefined;
};

const encrypt = (token) => {
  let encryptedToken = AES.encrypt(
    token,
    SHA256(process.env.API_TOKEN_SIGN).toString()
  ).toString();
  return encryptedToken;
};

export { decrypt, encrypt };
