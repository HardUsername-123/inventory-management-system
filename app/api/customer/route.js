import connectMongoDB from "@/lib/mongodb";
import Customer from "@/models/customer";
import { NextResponse } from "next/server";

//create
export async function POST(req) {
  try {
    const { customerId, name, email, phone, address } = await req.json();

    await connectMongoDB();

    const newCustomer = await Customer.create({
      customerId,
      name,
      email,
      phone,
      address,
    });

    // Convert timestamps to Philippine time
    const createdAtPHT = newCustomer.createdAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });
    const updatedAtPHT = newCustomer.updatedAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });

    // Return success response with Philippine time timestamps
    return NextResponse.json(
      {
        message: "Product created",
        product: {
          ...newCustomer._doc,
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

//display
export async function GET() {
  try {
    await connectMongoDB();
    const getCustomers = await Customer.find();
    return NextResponse.json({ getCustomers }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
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

    const deleteCustomer = await Customer.findByIdAndDelete(id);

    if (!deleteCustomer) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Customer deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Product:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
