"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function AddModal() {
  // State to hold product details
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [stockLevel, setStockLevel] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const router = useRouter();
  const { toast } = useToast(); // Correct destructure

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/products", {
        productId,
        productName,
        category,
        stockLevel,
        price,
        location,
      });

      if (res.status === 201) {
        // Display success toast
        setOpen(false);
        toast({
          title: "Success",
          description: "Product created successfully.",
          className: "bg-green-500 text-white", // Apply custom classes for green background and white text
        });

        // Refresh the page and reset form fields
        router.refresh();
        setProductId("");
        setProductName("");
        setCategory("");
        setStockLevel("");
        setPrice("");
        setLocation("");
      }
    } catch (error) {
      console.error("Error:", error);

      // Handle error with a toast
      toast({
        title: "Error!",
        description: "Failed to create product. Please try again.",
        variant: "destructive", // Optional, if you want specific variants
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label="Add Product"
          variant="outline"
          className="text-white bg-indigo-600 hover:bg-indigo-800 hover:text-white border-none"
        >
          <PlusIcon className="text-white" />
          Add product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product ID Input */}
            <div>
              <label htmlFor="productId" className="block font-medium">
                ID
              </label>
              <input
                type="number"
                id="productId"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter product id"
              />
            </div>

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

            {/* Stock Level Input */}
            <div>
              <label htmlFor="stockLevel" className="block font-medium">
                Stock Level
              </label>
              <input
                type="number"
                id="stockLevel"
                value={stockLevel}
                onChange={(e) => setStockLevel(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter stock level"
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
      </DialogContent>
    </Dialog>
  );
}
