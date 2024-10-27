import connectMongoDB from "@/lib/mongodb";
import Reorder from "@/models/reorder";
import { NextResponse } from "next/server";

//create
export async function POST(req) {
  try {
    const { productId, productName, category, stockLevel, price, supplier } =
      await req.json();

    await connectMongoDB();

    const newProduct = await Reorder.create({
      productId,
      productName,
      category,
      stockLevel,
      price,
      supplier,
    });

    // Convert timestamps to Philippine time
    const createdAtPHT = newProduct.createdAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });
    const updatedAtPHT = newProduct.updatedAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });

    // Return success response with Philippine time timestamps
    return NextResponse.json(
      {
        message: "Product created",
        product: {
          ...newProduct._doc,
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
    const getProduct = await Reorder.find();

    // Convert timestamps to Philippine time for each product
    const productsPHT = getProduct.map((product) => ({
      ...product._doc,
      createdAt: product.createdAt.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
      }),
      updatedAt: product.updatedAt.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
      }),
    }));

    return NextResponse.json({ products: productsPHT }, { status: 201 });
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

    const deletedProduct = await Reorder.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Product:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
