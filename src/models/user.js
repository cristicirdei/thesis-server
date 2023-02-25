import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: false
  }
});

// Create model
const User = model("user", UserSchema);

//Export model
export default { User, UserSchema };
