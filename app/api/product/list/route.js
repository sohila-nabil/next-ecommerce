import dbConnection from "@/config/dbConnection";
import authSeller from "@/lib/authSeller";
import Product from "@/lib/models/productModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnection()
    const products = await Product.find();
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
