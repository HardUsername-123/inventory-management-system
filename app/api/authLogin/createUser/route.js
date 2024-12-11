import connectMongoDB from "@/lib/mongodb";
import AuthLogin from "@/models/auth";
import { NextResponse } from "next/server";

//create
export async function POST(req) {
  try {
    const { username, password, role, affiliation, name, image } =
      await req.json();

    await connectMongoDB();

    const newUsers = await AuthLogin.create({
      username,
      password,
      role,
      affiliation,
      name,
      image,
    });

    // Convert timestamps to Philippine time
    const createdAtPHT = newUsers.createdAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });
    const updatedAtPHT = newUsers.updatedAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });

    // Return success response with Philippine time timestamps
    return NextResponse.json(
      {
        message: "User created",
        user: {
          ...newUsers._doc,
          createdAt: createdAtPHT,
          updatedAt: updatedAtPHT,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
