import connectMongoDB from "@/lib/mongodb";
import Supplier from "@/models/supplier";
import { NextResponse } from "next/server";

//create
export async function POST(req) {
  try {
    const { supplierId, name, email, phone, address } = await req.json();

    await connectMongoDB();

    const newSupplier = await Supplier.create({
      supplierId,
      name,
      email,
      phone,
      address,
    });

    // Convert timestamps to Philippine time
    const createdAtPHT = newSupplier.createdAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });
    const updatedAtPHT = newSupplier.updatedAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });

    // Return success response with Philippine time timestamps
    return NextResponse.json(
      {
        message: "Product created",
        product: {
          ...newSupplier._doc,
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
    const getSupplier = await Supplier.find();
    return NextResponse.json({ getSupplier }, { status: 201 });
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

    const deleteSupplier = await Supplier.findByIdAndDelete(id);

    if (!deleteSupplier) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Supplier deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Product:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
