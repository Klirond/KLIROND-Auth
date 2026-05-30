import * as mongoose from "mongoose";
import "dotenv/config";

import logger from "../middlewares/logger.ts";

const URI: string = process.env.URI ?? "";

const connect: Function = async (): Promise<void> => {
  await mongoose.connect(URI, {
    dbName: process.env.DB_NAME,
  });

  logger.info("Connected to DataBase");
};

export default connect;
