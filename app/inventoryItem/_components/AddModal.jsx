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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Swal from "sweetalert2";

export function AddModal({ onAdd }) {
  // State to hold product details
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [stockLevel, setStockLevel] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [supplierId, setSupplierId] = useState([]);

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
        supplier,
      });

      if (res.status === 201) {
        // Display success toast
        setOpen(false);
        // toast({
        //   title: "Success",
        //   description: "Product created successfully.",
        //   className: "bg-green-500 text-white", // Apply custom classes for green background and white text
        // });

        Swal.fire({
          title: "Success",
          text: "Product created successfully.",
          icon: "success",
        });
        console.log("Mao ni", res.data.product);
        onAdd(res.data.product);

        // Refresh the page and reset form fields
        router.refresh();
        setProductId("");
        setProductName("");
        setCategory("");
        setStockLevel("");
        setPrice("");
        setSupplier("");
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

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const res = await axios.get("/api/supplier");

        setSupplierId(res.data.getSupplier);
      } catch (error) {
        console.log(error);
      }
    };

    getSupplier();
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label="Add Product"
          variant="outline"
          className="text-white bg-indigo-600 hover:bg-indigo-800 hover:text-white border-none"
        >
          <PlusIcon className="text-white" />
          Add Stock
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
                type="text"
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

            {/* suppler Input */}
            <div>
              <label htmlFor="suppler" className="block font-medium">
                Suppler
              </label>
              <select
                id="supplier"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Choose a supplier
                </option>
                {supplierId.map((supplier, index) => (
                  <option key={index} value={supplier.supplierId}>
                    {supplier.supplierId}
                  </option>
                ))}
              </select>
              {supplier && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected Supplier ID: <strong>{supplier}</strong>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                className="px-6 py-2 text-white rounded-lg bg-indigo-500 hover:bg-indigo-600"
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
