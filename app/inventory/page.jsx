"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";

const Inventory = () => {
  // State to hold product details
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/products", {
        productName,
        category,
        quantity,
        price,
        location,
      });

      if (res.status === 201) {
        console.log("Product created successfully!");
        alert("Product created successfully!");

        setProductName("");
        setCategory("");
        setQuantity("");
        setPrice("");
        setLocation("");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 500) {
        console.log("Server error.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name Input */}
        <div>
          <label htmlFor="productName" className="block font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter product name"
          />
        </div>

        {/* Category Input */}
        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter category"
          />
        </div>

        {/* Quantity Input */}
        <div>
          <label htmlFor="quantity" className="block font-medium">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter quantity"
          />
        </div>

        {/* Price Input */}
        <div>
          <label htmlFor="price" className="block font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter price"
            step="0.01"
          />
        </div>

        {/* Location Input */}
        <div>
          <label htmlFor="location" className="block font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter location"
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Inventory;
