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
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function EditFormModal({ id }) {
  console.log(id);

  const [newProductId, setNewProductId] = useState();
  const [newProductName, setNewProductName] = useState();
  const [newCategory, setNewCategory] = useState();
  const [newStockLevel, setNewStockLevel] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newLocation, setNewLocation] = useState();
  const [data, setData] = useState([]);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getTopicById = async (id) => {
      try {
        const res = await axios.get(`/api/products/${id}`);

        if (res.status !== 200) {
          // Check for 200 status code
          throw new Error("Failed to fetch Product");
        } else {
          setData(res.data.getItem);
          setNewProductId(res.data.getItem.productId);
          setNewProductName(res.data.getItem.productName);
          setNewCategory(res.data.getItem.category);
          setNewStockLevel(res.data.getItem.stockLevel);
          setNewPrice(res.data.getItem.price);
          setNewLocation(res.data.getItem.location);

          console.log(res.data.getItem);
          console.log("Try lang ", res.data.getItem.productName);
        }

        // return res.data.getItem;
      } catch (error) {
        console.log(error);
      }
    };

    getTopicById(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newStockLevel) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "All field are required.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
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
        throw new Error("Failed to update a topic");
      }

      // toast("Update product Successful.");

      toast({
        title: "Success",
        description: "Update product Successful.",
        className: "bg-green-500 text-white", // Apply custom classes for green background and white text
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
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
          <PencilIcon />
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
            <Label htmlFor="productId" className="text-right">
              ID
            </Label>
            <Input
              id="productId"
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
            <Label htmlFor="stockLevel" className="text-right">
              Stock Level
            </Label>
            <Input
              id="stockLevel"
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
          <Button onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
