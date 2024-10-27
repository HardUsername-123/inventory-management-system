import mongoose, { Schema } from "mongoose";

const reorderSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stockLevel: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reorder =
  mongoose.models.Reorder || mongoose.model("Reorder", reorderSchema);

export default Reorder;
