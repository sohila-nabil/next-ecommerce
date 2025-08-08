import dbConnection from "@/config/dbConnection";
import authSeller from "@/lib/authSeller";
import Product from "@/lib/models/productModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "UnAutherized" });
    }
    const isSeller = await authSeller(user.id);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "UnAutherized" });
    }
    await dbConnection()
    const products = await Product.find({ userId: user.id });
    if (products.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No Products",
      });
    }
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
