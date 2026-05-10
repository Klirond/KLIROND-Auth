import * as mongoose from "mongoose";

const idSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A username is required"],
    unique: [true, "This username is already in use"],
  },
  email: {
    type: String,
    required: [true, "An email is required"],
    unique: [true, "This email is already in use"],
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minLength: [6, "A password should be 6 characters or more"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: { type: String },
  verificationExpiry: { type: Date },
});

const idModel = mongoose.model("Id", idSchema);

export default idModel;
