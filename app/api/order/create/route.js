import dbConnection from "@/config/dbConnection";
import Product from "@/lib/models/productModel";
import User from "@/lib/models/userModel";
import Order from "@/lib/models/orderModel"; // You forgot to import this
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const { address } = await req.json();
    if (!address) {
      return NextResponse.json({
        success: false,
        message: "please select an address",
      });
    }

    await dbConnection();
    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const cart = existingUser.cartItems; // object: { productId: quantity }

    let amount = 0;
    let items = [];

    for (const productId of Object.keys(cart)) {
      const quantity = cart[productId];
      const product = await Product.findById(productId);
      if (product) {
        const price = product.offerPrice || product.price || 0;
        amount += price * quantity;
        items.push({
          product: product._id,
          quantity,
        });
      }
    }

    // Save order
    const newOrder = await Order.create({
      userId: user.id,
      items,
      amount,
      address,
      date: Date.now(),
    });
    existingUser.cartItems = {};
    await existingUser.save();

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to place order",
    });
  }
};
