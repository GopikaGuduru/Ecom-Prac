import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import authSeller from "@/lib/authSeller";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({
        success: false,
        message: "not authorized",
      });
    }

    await connectDB();
    Address.length;
    Product.length;
    const orders = await Order.find({}).populate("address items.product");

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error in GET /api/order:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
