import mongoose from "mongoose";
import { dbURL } from "../util/database";

export class Database {
  bootstrap(options) {
    const databaseURL = options?.url ? options.url : dbURL;
    mongoose.set("strictQuery", true);
    mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async reset() {
    await mongoose.connection?.db?.dropDatabase();
  }

  async close() {
    await mongoose.disconnect();
  }
}
