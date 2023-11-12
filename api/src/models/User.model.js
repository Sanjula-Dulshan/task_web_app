import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: (true, "Name is required"),
      min: 3,
      max: 30,
    },
    email: {
      type: String,
      required: (true, "Email is required"),
      trim: true,
    },
    password: {
      type: String,
      required: (true, "Password is required"),
      min: 8,
      max: 30,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
