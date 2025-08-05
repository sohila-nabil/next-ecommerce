import mongoose from "mongoose";
var userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cartItems: {
      type: Object,
      default: {},
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { minimize: false, timestamps: true }
);

//Export the model
const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;