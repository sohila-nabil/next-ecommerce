import dbConnection from "@/config/dbConnection";
import User from "@/lib/models/userModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ success: false, message: "UnAutherized" });
    await dbConnection();
    const existingUser = await User.findById(user.id);
    const { cartItems } = existingUser;
    return NextResponse.json({ success: true, cartItems });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.message || "error in getting user cart",
    });
  }
};
