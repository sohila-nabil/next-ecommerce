import mongoose from "mongoose";

const addressShema = new mongoose.Schema({
  userId: String,
  fullName: String,
  phoneNumber: String,
  pinCode: Number,
  area: String,
  city: String,
  state: String,
});

const Address =
  mongoose.models.address || mongoose.model("address", addressShema);
export default Address;
