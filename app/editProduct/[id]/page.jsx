"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";

const UpdateProduct = () => {
  const router = useRouter();
  const { id } = useParams(); // Using router.query to access the ID

  const [newProductId, setNewProductId] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newStockLevel, setNewStockLevel] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newSupplier, setNewSupplier] = useState("");
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [supplierId, setSupplierId] = useState([]);
  const [supplier, setSupplier] = useState("");

  useEffect(() => {
    const getTopicById = async (id) => {
      try {
        const res = await axios.get(`/api/products/${id}`);

        if (res.status !== 200) {
          throw new Error("Failed to fetch Product");
        } else {
          const product = res.data.getItem;
          setData(product);
          setNewProductId(product.productId || "");
          setNewProductName(product.productName || "");
          setNewCategory(product.category || "");
          setNewStockLevel(product.stockLevel || 0);
          setNewPrice(product.price || 0);
          setNewSupplier(product.supplier || "");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTopicById(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newStockLevel ||
      !newProductId ||
      !newProductName ||
      !newCategory ||
      !newPrice ||
      !newSupplier
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
        newSupplier,
      });

      if (res.status !== 201) {
        throw new Error("Failed to update the product");
      }

      setOpen(false);

      toast.success("Product updated successfully.");

      router.push("/inventoryItem");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the product.");
    }
  };

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const res = await axios.get("/api/supplier");
        setSupplierId(res.data.getSupplier || []);
      } catch (error) {
        console.error(error);
      }
    };

    getSupplier();
  }, []);

  return (
    <div className="w-3/5 bg-myBgDark-lifgtDark m-5 p-5 rounded-lg text-slate-100">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="productId" className="text-right">
              ID
            </Label>
            <Input
              id="productId"
              onChange={(e) => setNewProductId(e.target.value)}
              value={newProductId}
              className="col-span-3 text-slate-400 border border-myBgDark-textSoft p-4 pe-12 text-sm shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="name" className="text-right">
              Product name
            </Label>
            <Input
              id="name"
              onChange={(e) => setNewProductName(e.target.value)}
              value={newProductName}
              className="col-span-3 text-slate-400 border border-myBgDark-textSoft p-4 pe-12 text-sm shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              onChange={(e) => setNewCategory(e.target.value)}
              value={newCategory}
              className="col-span-3 text-slate-400 border border-myBgDark-textSoft p-4 pe-12 text-sm shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="stockLevel" className="text-right">
              Stock Level
            </Label>
            <Input
              id="stockLevel"
              type="number"
              onChange={(e) => setNewStockLevel(Number(e.target.value))}
              value={newStockLevel}
              className="col-span-3 text-slate-400 border border-myBgDark-textSoft p-4 pe-12 text-sm shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              onChange={(e) => setNewPrice(Number(e.target.value))}
              value={newPrice}
              className="col-span-3 text-slate-400 border border-myBgDark-textSoft p-4 pe-12 text-sm shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="supplier" className="block font-medium">
              Supplier
            </label>
            <select
              id="supplier"
              value={newSupplier}
              onChange={(e) => setNewSupplier(e.target.value)}
              className="w-full bg-transparent border border-myBgDark-textSoft rounded-lg p-2 text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled className="bg-myBgDark-textSoft">
                Choose a supplier
              </option>
              {supplierId.map((supplier, index) => (
                <option
                  key={index}
                  value={supplier.supplierId}
                  className="bg-myBgDark-textSoft"
                >
                  {supplier.supplierId}
                </option>
              ))}
            </select>
            {newSupplier && (
              <p className="mt-2 text-sm text-slate-400">
                Supplier ID: <strong>{newSupplier}</strong>
              </p>
            )}
          </div>
        </div>
        <Button className="bg-indigo-500 hover:bg-indigo-700">
          Save Change
        </Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
