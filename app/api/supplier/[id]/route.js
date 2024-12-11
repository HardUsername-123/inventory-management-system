import connectMongoDB from "@/lib/mongodb";
import Supplier from "@/models/supplier";
import { NextResponse } from "next/server";

//update
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { supplierId, name, email, phone, address } = await request.json();
    await connectMongoDB();
    const updateSupplier = await Supplier.findByIdAndUpdate(id, {
      supplierId,
      name,
      email,
      phone,
      address,
    });
    console.log(updateSupplier);
    return NextResponse.json(
      { updateSupplier, message: "Supplier updated" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

//get by id
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const getItem = await Supplier.findOne({ _id: id });
    return NextResponse.json({ getItem }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
