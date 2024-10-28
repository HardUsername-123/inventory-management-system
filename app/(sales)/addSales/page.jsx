"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditFormModal } from "../sales/_components/EditFormModal";
import RemoveBtn from "../sales/_components/RemoveBtn";

// Define Zod schema for validation
const salesSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantity must be greater than 0"),
});

const AddSales = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [total, setTotals] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const [product, setProduct] = useState();
  const [totalStockLevel, setTotalStockLevel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
      const response = await axios.post("/api/salesItem", {
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

      // router.refresh();
      // router.push("/sales");
    } catch (error) {
      console.log(
        "Error creating sales record:",
        error.response?.data.message || error.message
      );
      swal({
        position: "top-end",
        icon: "error",
        title:
          "Failed to sales Item: " +
          (error.response?.data.message || error.message),
        showConfirmButton: false,
      });
    }
  };

  // Define the formatter for PHP currency
  const pesoFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("/api/salesItem");
        setSales(response.data.sales);
        const salesData = response.data.sales;

        // Calculate total for each sale
        const calculatedTotals = salesData.map((sale) => {
          const price = sale.inventoryItem?.price || 0;
          const quantity = sale.quantity || 0;
          return price * quantity;
        });

        // Format totals as currency for display
        const formattedTotals = calculatedTotals.map((total) =>
          pesoFormatter.format(total)
        );
        setTotals(formattedTotals);

        console.log("Calculated Totals:", calculatedTotals);

        // Sum all totals
        const grandTotalValue = calculatedTotals.reduce(
          (acc, curr) => acc + curr,
          0
        );

        // Format the grand total and update state
        setGrandTotal(pesoFormatter.format(grandTotalValue));

        setLoading(false);
      } catch (err) {
        setError(err.response?.data.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const submitSales = async () => {
    // Validation: Check if sales is empty
    if (!sales || sales.length === 0) {
      swal({
        position: "top-end",
        icon: "warning",
        title: "No sales items to submit.",
        showConfirmButton: false,
      });
      return; // Exit the function if there are no sales items
    }

    try {
      const response = await axios.post("/api/sales", { sales });

      if (response.status === 200) {
        swal({
          position: "top-end",
          icon: "success",
          title: "Sales created successfully.",
          showConfirmButton: false,
        });
        router.refresh();
        router.push("/sales");
      }
    } catch (error) {
      console.error(
        "Error creating sales record:",
        error.response?.data.message || error.message
      );
      swal({
        position: "top-end",
        icon: "error",
        title:
          "Failed to save Sales Item: " +
          (error.response?.data.message || error.message),
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <h1 className="text-2xl mb-5 px-5 mt-5 text-white">Item</h1>
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
              className="w-full outline-none" // Adjust styles as needed
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
              className="w-full outline-none" // Adjust styles as needed
            />
            {errors.quantity && (
              <span className="text-red-500 text-sm">
                {errors.quantity.message}
              </span>
            )}
          </div>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
            Add Item
          </Button>
        </form>
      </div>
      <h1 className="text-2xl mb-5 px-5 text-white">Sales</h1>
      <div className="m-5 p-8 bg-myBgDark-lifgtDark rounded-lg">
        <Table className="min-w-full bg-myBgDark-lifgtDark shadow-md rounded-lg no-scrollbar">
          <TableHeader>
            <TableRow>
              <TableHead className="text-white ">Date Created</TableHead>
              <TableHead className="text-white ">ID</TableHead>
              <TableHead className="text-white ">Product name</TableHead>
              <TableHead className="text-white ">Quantity</TableHead>
              <TableHead className="text-white ">Price</TableHead>
              {/* <TableHead className="text-white ">Supplier</TableHead> */}
              <TableHead className="text-white ">Total</TableHead>
              <TableHead className="text-white ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-none">
            {sales.length > 0 ? (
              sales.map((item, index) => (
                <TableRow
                  key={item._id}
                  className="border-none hover:bg-myBgDark-darkBg"
                >
                  <TableCell className="text-white">{item.createdAt}</TableCell>
                  <TableCell className="text-white">{item.productId}</TableCell>
                  <TableCell className="text-white">
                    {item.inventoryItem?.productName}
                  </TableCell>
                  <TableCell className="text-white">{item.quantity}</TableCell>
                  <TableCell className="text-white">
                    {pesoFormatter.format(item.inventoryItem?.price)}
                  </TableCell>
                  {/* <TableCell className="text-white">
                      {item.inventoryItem?.supplier || "N/A"}
                    </TableCell> */}
                  <TableCell className="text-white">{total[index]}</TableCell>
                  <TableCell className="space-x-2">
                    {/* <Link href={`/editProduct/${item._id}`}>Update</Link> */}
                    <EditFormModal />
                    <RemoveBtn />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-white">
                  No Sales Item Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end items-center m-3 text-center py-4 text-white">
          Grand Totals : {grandTotal}
        </div>

        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={submitSales}
          >
            Add Sales
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddSales;
