import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    await connectDB();
    const user = User.findById(userId);
    const { cartItems } = user;
    NextResponse.json({ success: true, cartItems: cartItems });
  } catch (error) {
    NextResponse.json({ success: false, message: error.message });
  }
}
