"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigLeftIcon, Backpack } from "lucide-react";

const Details = ({ params }) => {
  const [item, setItem] = useState(null); // Initialize as null for a single item

  console.log("Kuha na ang data", item);
  console.log("Id ni ", params.item);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await axios.get(`/api/products/${params.item}`);
        if (res.status === 200) {
          console.log("Successfully displayed data");
          setItem(res.data.getItem); // Assuming getItem is a single item object
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [params.item]); // Include params.item in the dependency array

  // Loading state
  if (!item) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Inventory Item Details
      </h2>

      <Card className="shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-gray-700">Item Details</CardTitle>
        </CardHeader>
        <CardContent key={item._id}>
          {" "}
          {/* Use item directly */}
          <div className="mb-4">
            <strong className="text-gray-700">Product name :</strong>
            <span className="text-gray-500 block">{item.productName}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Category :</strong>
            <span className="text-gray-500 block">{item.category}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Quantity :</strong>
            <span className="text-gray-500 block">{item.quantity}</span>{" "}
            {/* Change this to item.quantity */}
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Price :</strong>
            <span className="text-gray-500 block">{item.price}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Location :</strong>
            <span className="text-gray-500 block">{item.location}</span>
          </div>
        </CardContent>

        <div className="flex justify-end mt-6">
          <Button
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <ArrowBigLeftIcon />
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Details;
