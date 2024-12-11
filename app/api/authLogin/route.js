import connectMongoDB from "@/lib/mongodb";
import AuthLogin from "@/models/auth";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the request body for username and password
    const { username, password } = await req.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Find the user in the database by username
    const user = await AuthLogin.findOne({ username });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Compare the plain text password (Insecure, use hashing in future)
    if (password !== user.password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a JWT token with user data
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role }, // Include user role
      process.env.JWT_SECRET, // Ensure this is set in your .env.local file
      { expiresIn: "24h" } // Token expiration time
    );

    // Return a success response with the user data and token
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          ...user.toObject(), // Convert Mongoose document to plain object
        },
        token, // Include the JWT token in the response
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// GET: Fetch User Details by Token
export async function GET(req) {
  try {
    // Extract the Authorization header
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization token missing or invalid" },
        { status: 401 }
      );
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    // Verify the JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Fetch the user from the database using the token data
    const user = await AuthLogin.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the user details
    return NextResponse.json(
      {
        message: "User details fetched successfully",
        user: {
          _id: user._id,
          username: user.username,
          role: user.role,
          image: user.image,
          affiliation: user.affiliation,
          name: user.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

//delete
export async function DELETE(request) {
  // Get the ID from the URL search parameters
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  try {
    await connectMongoDB();

    const deleteUser = await AuthLogin.findByIdAndDelete(id);

    if (!deleteUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting User:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
