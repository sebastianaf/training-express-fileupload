import mongoose from "mongoose";
import { dbUsers } from "../config/db";

const { user, password, host, port, database } = dbUsers;
const uri = `mongodb://${user}:${password}@${host}:${port}`;
const connection = mongoose.createConnection(uri, { dbName: database });

export { connection };
