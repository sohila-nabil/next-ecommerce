import dbConnection from "@/config/dbConnection";
import User from "@/lib/models/userModel";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }
    await dbConnection();
    const userData = await User.findById(user.id);
    if (!userData) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { user: userData, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error", success: false },
      { status: 500 }
    );
  }
};
