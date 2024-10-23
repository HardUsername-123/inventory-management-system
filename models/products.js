import mongoose, { Schema } from "mongoose";

const productsSchema = new Schema(
  {
    productId: {
      type: Number,
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
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productsSchema);

export default Product;
