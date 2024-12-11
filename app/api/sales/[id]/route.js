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
      { updateSales, message: "Sales updated" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

//get by id
// export async function GET(request, { params }) {
//   try {
//     const { id } = params;
//     await connectMongoDB();
//     const getItem = await Sales.findOne({ _id: id });
//     return NextResponse.json({ getItem }, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// export async function GET(request, { params }) {
//   try {
//     const { id } = params;
//     await connectMongoDB();

//     // No 'select' option, so all fields are retrieved
//     const getItem = await Sales.findOne({ _id: id }).populate("inventoryItem");
//     return NextResponse.json({ getItem }, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();

    // Populate the inventoryItem and retrieve all its fields
    const getSales = await Sales.find({ _id: id }).populate("inventoryItem");

    // if (!getItem || !getItem.inventoryItem) {
    //   return NextResponse.json({ message: "Item not found" }, { status: 404 });
    // }

    // // Calculate the total by multiplying quantity and price from inventoryItem
    // const total = getItem.quantity * getItem.inventoryItem.price;

    const salesRecordsWithTime = getSales.map((record) => ({
      ...record._doc,
      inventoryItem: record.inventoryItem
        ? {
            // spread the populated inventoryItem fields
            ...record.inventoryItem._doc,
          }
        : null,
    }));

    return NextResponse.json(
      { getSales: salesRecordsWithTime },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
