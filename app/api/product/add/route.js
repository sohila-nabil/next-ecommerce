import cloudinaryConfig from "@/config/cloudinary";
import authSeller from "@/lib/authSeller";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnection from "@/config/dbConnection";
import Product from "@/lib/models/productModel";

cloudinaryConfig;

export const POST = async (req) => {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const isSeller = await authSeller(user.id);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not Authorized" });
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");

    const files = formData.getAll("images");
    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No Files Uploaded",
      });
    }

    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const bufferArray = await file.arrayBuffer();
        const buffer = Buffer.from(bufferArray);

        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ resource_type: "auto" }, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            })
            .end(buffer);
        });
      })
    );

    const images = uploadResults.map((img) => img.secure_url);

    await dbConnection();
    const newProduct = await Product.create({
      userId: user.id,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      images,
      date: Date.now(),
    });

    return NextResponse.json({
      success: true,
      message: "Product Added Successfully",
      newProduct,
    });
  } catch (error) {
    console.error("Error uploading product:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to Add Product",
    });
  }
};
