import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/products";
import { NextResponse } from "next/server";

//update
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {
      newProductId: productId,
      newProductName: productName,
      newCategory: category,
      newStockLevel: stockLevel,
      newPrice: price,
      newLocation: location,
    } = await request.json();
    await connectMongoDB();
    await Product.findByIdAndUpdate(id, {
      productId,
      productName,
      category,
      stockLevel,
      price,
      location,
    });
    return NextResponse.json({ message: "Product updated" }, { status: 201 });
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
    const getItem = await Product.findOne({ _id: id });
    return NextResponse.json({ getItem }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
