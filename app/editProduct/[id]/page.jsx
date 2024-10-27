"use client";

import { EditModal } from "@/app/editProduct/[id]/EditModal";
import axios from "axios";

// Use axios.get for fetching the product by ID
const getTopicById = async (id) => {
  try {
    const res = await axios.get(`/api/products/${id}`); // Changed to GET

    if (res.status !== 200) {
      // Check for 200 status code
      throw new Error("Failed to fetch product");
    }

    return res.data.getItem; // Axios automatically parses the JSON, use res.data
  } catch (error) {
    console.log(error);
  }
};

export default async function EditProduct({ params }) {
  const { id } = params;

  console.log(id);

  // Fetch the product data
  const getItem = await getTopicById(id);

  console.log(getItem);

  // Check if product data exists
  if (!getItem) {
    console.log("Product not found");
    return <div>Product not found</div>;
  }

  if (getItem) {
    console.log("Product Name:", getItem.productName);
    console.log("Category:", getItem.category);
    console.log("Quantity:", getItem.quantity);
    console.log("Price:", getItem.price);
    console.log("Location:", getItem.location);
  }

  const { productName, category, quantity, price, location } = getItem;
  console.log("bira", getItem.productName);

  return (
    <EditModal
      id={id}
      productName={productName}
      category={category}
      quantity={quantity}
      price={price}
      location={location}
    />
  );
}
