import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    offerPrice: {
      type: Number,
    },
    images: {
      type: Array,
    },
    category: {
      type: String,
    },
    date: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.product || mongoose.model("product", productSchema);
export default Product;
