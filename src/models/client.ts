import mongoose, { Schema } from "mongoose";

const ClientSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model("clients", ClientSchema);
