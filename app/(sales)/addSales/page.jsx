"use client";

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

// Define Zod schema for validation
const salesSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantity must be greater than 0"),
});

const AddSales = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(salesSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/sales", {
        productId: data.productId,
        quantity: data.quantity,
      });

      if (response.status === 200) {
        swal({
          position: "top-end",
          icon: "success",
          title: "Sales created successfully.",
          showConfirmButton: false,
        });
      }

      router.refresh();
      router.push("/sales");
    } catch (error) {
      console.error(
        "Error creating sales record:",
        error.response?.data.message || error.message
      );
      swal({
        position: "top-end",
        icon: "error",
        title:
          "Failed to create sales record: " +
          (error.response?.data.message || error.message),
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="m-5 p-8 bg-myBgDark-lifgtDark rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="productId" className="text-slate-50">
            Product ID
          </Label>
          <Input
            type="text"
            id="productId"
            {...register("productId")}
            className="w-full" // Adjust styles as needed
          />
          {errors.productId && (
            <span className="text-red-500 text-sm">
              {errors.productId.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="quantity" className="text-slate-50">
            Quantity
          </Label>
          <Input
            type="number"
            id="quantity"
            {...register("quantity", { valueAsNumber: true })}
            className="w-full" // Adjust styles as needed
          />
          {errors.quantity && (
            <span className="text-red-500 text-sm">
              {errors.quantity.message}
            </span>
          )}
        </div>
        <Button type="submit" className="bg-indigo-600">
          Add Sales Record
        </Button>
      </form>
    </div>
  );
};

export default AddSales;
