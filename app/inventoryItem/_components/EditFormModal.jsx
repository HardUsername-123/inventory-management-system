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

export function EditFormModal({ id, onUpdate }) {
  console.log(id);

  const [newProductId, setNewProductId] = useState();
  const [newProductName, setNewProductName] = useState();
  const [newCategory, setNewCategory] = useState();
  const [newStockLevel, setNewStockLevel] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newSupplier, setNewSupplier] = useState();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  //TODO: Edit not reload

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
          setNewSupplier(res.data.getItem.supplier);
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

    // Check for required fields
    if (
      !newStockLevel ||
      !newProductId ||
      !newProductName ||
      !newCategory ||
      !newPrice ||
      !newSupplier
    ) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "All fields are required.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    try {
      // Make API request to update the product
      const res = await axios.put(`/api/products/${id}`, {
        newProductId,
        newProductName,
        newCategory,
        newStockLevel,
        newPrice,
        newSupplier,
      });

      if (res.status !== 201) {
        throw new Error("Failed to update the product");
      }

      // Call the onUpdate function to update the product in the parent component's state
      onUpdate(res.data.updateProduct); // Ensure res.data.updateProduct is valid

      // Close the modal
      setOpen(false);

      // Show success toast
      toast({
        title: "Success",
        description: "Product updated successfully.",
        className: "bg-green-500 text-white", // Custom styling for the toast
      });

      // Optionally refresh the data without reloading the page
      router.push("/inventoryItem");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update the product.",
      });
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
              type="number"
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
              type="number"
              onChange={(e) => setNewPrice(e.target.value)}
              value={newPrice}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="supplier" className="text-right">
              Supplier
            </Label>
            <Input
              id="supplier"
              onChange={(e) => setNewSupplier(e.target.value)}
              value={newSupplier}
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
