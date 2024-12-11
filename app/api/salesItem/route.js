import connectMongoDB from "@/lib/mongodb";
import SalesItem from "@/models/salesItem";
import Product from "@/models/products";
import { NextResponse } from "next/server";
import { record } from "zod";

// Create a new sales record
export async function POST(req) {
  try {
    const { productId, quantity } = await req.json();

    await connectMongoDB();

    // Find the product by productId
    const product = await Product.findOne({ productId });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found for the given productId" },
        { status: 404 }
      );
    }

    // Check if there is enough stock to fulfill the sale
    if (quantity >= product.stockLevel) {
      return NextResponse.json(
        { message: `Insufficient stock for this sale ${product.productName}` },
        { status: 400 }
      );
    }

    // // Calculate the new stock level
    // const updatedStockLevel = product.stockLevel - quantity;

    // // Update the product's stock level in the database
    // await Product.findByIdAndUpdate(product._id, {
    //   stockLevel: updatedStockLevel,
    // });

    // Create a new sales record
    const newSalesItemRecord = await SalesItem.create({
      productId,
      quantity,
      inventoryItem: product._id,
    });

    // Convert timestamps to Philippine time
    const createdAtPHT = newSalesItemRecord.createdAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });
    const updatedAtPHT = newSalesItemRecord.updatedAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });

    // Return success response with updated product and sales record
    return NextResponse.json(
      {
        message: "Sales Item record created successfully",
        salesRecord: {
          ...newSalesItemRecord._doc,
          createdAt: createdAtPHT,
          updatedAt: updatedAtPHT,
        },
        // updatedProduct: {
        //   ...product._doc,
        //   stockLevel: updatedStockLevel,
        // },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

//display
export async function GET(req) {
  try {
    await connectMongoDB();
    const salesItemRecords = await SalesItem.find().populate("inventoryItem");

    const salesItemRecordsWithTime = salesItemRecords.map((record) => ({
      ...record._doc,
      inventoryItem: record.inventoryItem
        ? {
            ...record.inventoryItem._doc, // spread the populated inventoryItem fields
          }
        : null,
      createdAt: record.createdAt.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
      }),
      updatedAt: record.updatedAt.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
      }),
    }));

    return NextResponse.json(
      { sales: salesItemRecordsWithTime },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching sales Item records:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
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

    const deletedSalesItem = await SalesItem.findByIdAndDelete(id);

    if (!deletedSalesItem) {
      return NextResponse.json(
        { message: "Sales Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Sales Item deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Sales:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
