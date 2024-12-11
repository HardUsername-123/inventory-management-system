import connectMongoDB from "@/lib/mongodb";
import AuthLogin from "@/models/auth";
import { NextResponse } from "next/server";

//display
export async function GET() {
  try {
    await connectMongoDB();
    const getUsers = await AuthLogin.find();
    return NextResponse.json({ getUsers });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
