import dbConnection from "@/config/dbConnection";
import Address from "@/lib/models/addressModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Un Autherized" });
    }
    await dbConnection();
    const address = await Address.find({ userId: user.id });
    return NextResponse.json({ success: true, address });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: error.message || "Error fetching address",
    });
  }
};
