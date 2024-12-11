import connectMongoDB from "@/lib/mongodb";
import Customer from "@/models/customer";
import { NextResponse } from "next/server";

//update
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { customerId, name, email, phone, address } = await request.json();
    await connectMongoDB();
    const updateCustomer = await Customer.findByIdAndUpdate(id, {
      customerId,
      name,
      email,
      phone,
      address,
    });
    console.log(updateCustomer);
    return NextResponse.json(
      { updateCustomer, message: "Customer updated" },
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
    const getItem = await Customer.findOne({ _id: id });
    return NextResponse.json({ getItem }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
