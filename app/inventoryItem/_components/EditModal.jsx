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
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner"; // Ensure you're using this toast

export function EditModal({ id, onUpdate }) {
  const [newProductId, setNewProductId] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newStockLevel, setNewStockLevel] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getProductById = async (id) => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        if (res.status === 200) {
          const product = res.data.getItem;
          setNewProductId(product.productId);
          setNewProductName(product.productName);
          setNewCategory(product.category);
          setNewStockLevel(product.stockLevel);
          setNewPrice(product.price);
          setNewLocation(product.location);
        } else {
          throw new Error("Failed to fetch product data");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      getProductById(id);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newStockLevel ||
      !newProductId ||
      !newProductName ||
      !newCategory ||
      !newPrice ||
      !newLocation
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const res = await axios.put(`/api/products/${id}`, {
        newProductId,
        newProductName,
        newCategory,
        newStockLevel,
        newPrice,
        newLocation,
      });

      if (res.status !== 201) {
        throw new Error("Failed to update product");
      }

      setOpen(false);
      onUpdate(res.data.updateProduct); // Call the onUpdate to refresh data
      toast.success("Product updated successfully.");
      router.refresh(); // Refresh page
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label="Edit"
          variant="outline"
          className="text-blue-500 hover:text-blue-700"
        >
          <PencilIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Product name
              </Label>
              <Input
                id="name"
                onChange={(e) => setNewProductId(e.target.value)}
                value={newProductId}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Product name
              </Label>
              <Input
                id="name"
                onChange={(e) => setNewProductName(e.target.value)}
                value={newProductName}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                onChange={(e) => setNewCategory(e.target.value)}
                value={newCategory}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Stock Level
              </Label>
              <Input
                id="quantity"
                onChange={(e) => setNewStockLevel(e.target.value)}
                value={newStockLevel}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                onChange={(e) => setNewPrice(e.target.value)}
                value={newPrice}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                onChange={(e) => setNewLocation(e.target.value)}
                value={newLocation}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
