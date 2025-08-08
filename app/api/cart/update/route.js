import dbConnection from "@/config/dbConnection";
import User from "@/lib/models/userModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  debugger
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    const { cartData } = await req.json();

    await dbConnection();
    const existingUser = await User.findById(user.id);
    if (!existingUser)
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
      console.log(cartData);
      

    existingUser.cartItems = cartData;
    await existingUser.save();
    return NextResponse.json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error(error);
    NextResponse.json({
      success: false,
      message: error.message || "error at updating cart",
    });
  }
};
