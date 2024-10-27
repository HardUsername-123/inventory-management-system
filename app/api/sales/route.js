import connectMongoDB from "@/lib/mongodb";
import Sales from "@/models/sales";
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

    // Calculate the new stock level
    const updatedStockLevel = product.stockLevel - quantity;

    // Update the product's stock level in the database
    await Product.findByIdAndUpdate(product._id, {
      stockLevel: updatedStockLevel,
    });

    // Create a new sales record
    const newSalesRecord = await Sales.create({
      productId,
      quantity,
      inventoryItem: product._id,
    });

    // Convert timestamps to Philippine time
    const createdAtPHT = newSalesRecord.createdAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });
    const updatedAtPHT = newSalesRecord.updatedAt.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    });

    // Return success response with updated product and sales record
    return NextResponse.json(
      {
        message: "Sales record created successfully",
        salesRecord: {
          ...newSalesRecord._doc,
          createdAt: createdAtPHT,
          updatedAt: updatedAtPHT,
        },
        updatedProduct: {
          ...product._doc,
          stockLevel: updatedStockLevel,
        },
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
    const salesRecords = await Sales.find().populate("inventoryItem");

    const salesRecordsWithTime = salesRecords.map((record) => ({
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

    return NextResponse.json({ sales: salesRecordsWithTime }, { status: 201 });
  } catch (error) {
    console.error("Error fetching sales records:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
