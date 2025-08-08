import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    amount: {
      type: Number,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
    },
    status: {
      type: String,
      default: "Order Placed",
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.order || mongoose.model("order", orderSchema);
export default Order;
