import dbConnection from "@/config/dbConnection";
import Order from "@/lib/models/orderModel";
import Address from "@/lib/models/addressModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "UnAuterized" });
    }
    await dbConnection();
    const orders = await Order.find({ userId: user.id }).populate([
      { path: "address" },
      { path: "items.product" },
    ]);

    if (orders.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No Orders",
      });
    }

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "error in fetching orderes",
    });
  }
};
