import connectMongoDB from "@/lib/mongodb";
import AuthLogin from "@/models/auth";
import { NextResponse } from "next/server";

// Update user by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Destructure fields from the request body
    const { username, password, image, affiliation, name } = body;

    await connectMongoDB();

    // Find and update the user
    const updatedUser = await AuthLogin.findByIdAndUpdate(
      id,
      {
        username,
        password,
        image,
        affiliation,
        name,
      },
      { new: true, runValidators: true } // Return the updated document and validate inputs
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

//get by id
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const getUser = await AuthLogin.findOne({ _id: id });
    if (!getUser) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ getUser }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
