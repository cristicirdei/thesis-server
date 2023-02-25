import { Schema, model } from "mongoose";

const UserModule = require("../models/user").default;
const UserSchema = UserModule.UserSchema;

const DocumentSchema = new Schema({
  owner: UserSchema,
  title: String,
  body: String
});

// Create model
const Document = model("document", DocumentSchema);

//Export model
export default { Document, DocumentSchema };
