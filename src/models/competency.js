import { Schema, model } from "mongoose";

const UserModule = require("../models/user").default;
const UserSchema = UserModule.UserSchema;

const DocumentModule = require("../models/document").default;
const DocumentSchema = DocumentModule.DocumentSchema;

const CompetencySchema = new Schema({
  name: String,
  a_id: Number,
  owner: UserSchema,
  people: [
    {
      user: UserSchema,
      checkpoints: [
        {
          c_id: String,
          status: {
            type: String,
            default: "undefined"
          }
        }
      ]
    }
  ],
  notes: [DocumentSchema]
});

// Create model
const Competency = model("competency", CompetencySchema);

//Export model
export default { Competency, CompetencySchema };
