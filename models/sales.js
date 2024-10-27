import mongoose, { Schema } from "mongoose";

const salesSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    inventoryItem: {
      type: Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
      required: true,
    },
    total: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.models.Sales || mongoose.model("Sales", salesSchema);

export default Sales;

// await Sales.find().populate("supplier", "name address");
