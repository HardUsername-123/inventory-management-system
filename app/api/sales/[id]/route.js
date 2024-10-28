import connectMongoDB from "@/lib/mongodb";
import Sales from "@/models/sales";
import { NextResponse } from "next/server";

//update
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {
      newProductId: productId,
      newProductName: productName,
      newQuantity: Quantity,
      newPrice: price,
      newTotal: total,
    } = await request.json();
    await connectMongoDB();
    const updateSales = await Sales.findByIdAndUpdate(id, {
      productId,
      productName,
      Quantity,
      price,
      total,
    });
    console.log(updateSales);
    return NextResponse.json(
      { updateProduct, message: "Sales updated" },
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
    const getItem = await Sales.findOne({ _id: id });
    return NextResponse.json({ getItem }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
