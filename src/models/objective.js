import { Schema, model } from "mongoose";

const UserModule = require("../models/user").default;
const UserSchema = UserModule.UserSchema;

const ObjectiveSchema = new Schema({
  name: String,
  o_id: String,
  owner: UserSchema,
  checkpoints: [
    {
      c_id: String,
      status: {
        type: String,
        default: "undefined"
      }
    }
  ]
});

// Create model
const Objective = model("objective", ObjectiveSchema);

//Export model
export default { Objective, ObjectiveSchema };
