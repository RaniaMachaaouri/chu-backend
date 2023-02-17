import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is Required"],
    },
    lastName: {
      type: String,
      required: [true, "LastName is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    userType: {
      type: String,
    },
  },
  { versionKey: false }
);

export default mongoose.model("users", UserSchema);
