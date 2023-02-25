import { Schema, model } from "mongoose";

const UserModule = require("../models/user").default;
const UserSchema = UserModule.UserSchema;

const ProjectSchema = new Schema({
  name: String,
  company: String,
  details: String,
  owner: UserSchema,
  team: [UserSchema]
});

// Create model
const Project = model("project", ProjectSchema);

//Export model
export default { Project, ProjectSchema };
