import connectMongoDB from "@/lib/mongodb";
import Sales from "@/models/sales";
import Product from "@/models/products";
import SalesItem from "@/models/salesItem";
import { NextResponse } from "next/server";
import { record } from "zod";

// Create a new sales record
export async function POST(req) {
  try {
    const { sales } = await req.json();
    await connectMongoDB();

    const salesRecords = await Promise.all(
      sales.map(async ({ productId, quantity }) => {
        // Find the product in the inventory
        const product = await Product.findOne({ productId });
        if (!product) throw new Error(`Product not found for ID ${productId}`);

        // Check stock levels
        if (quantity > product.stockLevel)
          throw new Error(`Insufficient stock for ${product.productName}`);

        // // Update the product's stock level
        // const updatedStockLevel = product.stockLevel - quantity;
        // await Product.findByIdAndUpdate(product._id, {
        //   stockLevel: updatedStockLevel,
        // });

        // Create the sales record
        const saleRecord = await Sales.create({
          productId,
          quantity,
          inventoryItem: product._id,
        });

        if (!saleRecord) {
          return NextResponse.json(
            { message: "No sales Item." },
            { status: 404 }
          );
        }

        // Remove the item from SalesItem collection
        await SalesItem.deleteOne({ productId, quantity });

        return saleRecord;
      })
    );

    return NextResponse.json(
      {
        message:
          "All sales records created and corresponding items removed from SalesItem successfully",
        salesRecords,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
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

//delete
export async function DELETE(request) {
  // Get the ID from the URL search parameters
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  try {
    await connectMongoDB();

    const deletedSales = await Sales.findByIdAndDelete(id);

    if (!deletedSales) {
      return NextResponse.json({ message: "Sales not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Sales deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Sales:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
