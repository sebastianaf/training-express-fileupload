import dotenv from "dotenv"
dotenv.config()

const whitelist = [`${process.env.API_CLIENT}`];

export default whitelist;
