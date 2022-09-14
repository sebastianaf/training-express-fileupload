import { connection } from "../mongoose";

/**
 * Importing Schemas
 */
import { AccessSchema } from "./access.model";

/**
 * Registering models to the connection
 */
const AccessModel = connection.model("Access", AccessSchema);

export { AccessModel };
