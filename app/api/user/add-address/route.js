import dbConnection from "@/config/dbConnection";
import Address from "@/lib/models/addressModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const user = await currentUser();
    const { address } = await req.json();
    await dbConnection();
    const newAddress = await Address.create({
      ...address,
      userId: user.id,
    });
    return NextResponse.json({
      success: true,
      message: "Address added successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.message || "Error adding address",
    });
  }
};
