import connectMongoDB from "@/lib/mongodb";
import Reorder from "@/models/reorder";
import { NextResponse } from "next/server";

//get by id
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const getItem = await Reorder.findOne({ _id: id });
    if (!getItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ getItem }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
