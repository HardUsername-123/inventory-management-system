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
import { useState } from "react";
import { toast } from "sonner";

export function EditModal({
  id,
  productName,
  category,
  quantity,
  price,
  location,
}) {
  console.log(id);
  console.log(productName);
  console.log(category);
  console.log(quantity);
  console.log(price);
  console.log(location);

  const [newProductName, setNewProductName] = useState(productName);
  const [newCategory, setNewCategory] = useState(category);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [newPrice, setNewPrice] = useState(price);
  const [newLocation, setNewLocation] = useState(location);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/api/products/${id}`, {
        newProductName,
        newCategory,
        newQuantity,
        newPrice,
        newLocation,
      });

      if (res.status !== 201) {
        throw new Error("Failed to update a topic");
      }

      toast("Update product Successful.");

      router.refresh();
    } catch (error) {
      comsole.log(error);
    }
  };
  return (
    <Dialog>
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
            Make changes your Product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
              Quantity
            </Label>
            <Input
              id="quantity"
              onChange={(e) => setNewQuantity(e.target.value)}
              value={newQuantity}
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
          <Button onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
