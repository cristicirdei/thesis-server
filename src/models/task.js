import { Schema, model } from "mongoose";

const UserModule = require("../models/user").default;
const UserSchema = UserModule.UserSchema;

const TaskSchema = new Schema({
  owner: UserSchema,
  title: String,
  body: String,
  deadline: Date,
  state: String
});

// Create model
const Task = model("task", TaskSchema);

//Export model
export default { Task, TaskSchema };
