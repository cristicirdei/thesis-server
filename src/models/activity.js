import { Schema, model } from "mongoose";

const UserModule = require("../models/user").default;
const UserSchema = UserModule.UserSchema;

const TaskModule = require("../models/task").default;
const TaskSchema = TaskModule.TaskSchema;

const DocumentModule = require("../models/document").default;
const DocumentSchema = DocumentModule.DocumentSchema;

const ActivitySchema = new Schema({
  name: String,
  a_id: Number,
  startDate: Date,
  endDate: Date,
  owner: UserSchema,
  notes: [DocumentSchema],
  tasks: [TaskSchema]
});

// Create model
const Activity = model("activity", ActivitySchema);

//Export model
export default { Activity, ActivitySchema };
