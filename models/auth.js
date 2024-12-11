import mongoose, { Schema } from "mongoose";

const authSchema = new Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    affiliation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AuthLogin =
  mongoose.models.AuthLogin || mongoose.model("AuthLogin", authSchema);

export default AuthLogin;
