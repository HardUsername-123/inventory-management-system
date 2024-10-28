import mongoose, { Schema } from "mongoose";

const salesItemSchema = new Schema(
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

const SalesItem =
  mongoose.models.SalesItem || mongoose.model("SalesItem", salesItemSchema);

export default SalesItem;

// await Sales.find().populate("supplier", "name address");
