"use client";

import React, { useEffect, useState } from "react";
import Loading from "@/app/_components/Loading";
import { Eye, Plus, Search, Trash2, View } from "lucide-react";
import { AddModal } from "../../inventoryItem/_components/AddModal";
import { EditFormModal } from "./_components/EditFormModal";
import RemoveBtn from "./_components/RemoveBtn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

const SalesInventory = () => {
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

  // Define the formatter for PHP currency
  const pesoFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("/api/sales");
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

  // Function to handle deletion and update the state
  const handleDelete = (id) => {
    setProduct(sales.filter((item) => item._id !== id)); // Remove deleted item from product array
  };

  // Handle search input and filter data
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value !== "") {
      const filtered = sales.filter(
        (item) =>
          item.inventoryItem?.productName
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.productId.toString().toLowerCase().includes(value.toLowerCase()) // Convert productId to string
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <>
      <div className="p-5">
        <h2 className="text-2xl text-white mb-4">Sales list</h2>
        {/* Table */}
        <div className="overflow-x-auto h-[550px] w-full bg-myBgDark-lifgtDark rounded-lg px-3">
          {/* Search Box */}
          <div className="flex justify-between my-3">
            <div className="w-72">
              <div className="flex items-center rounded-lg bg-myBgDark-textSoft">
                <Search className="w-5 h-5 text-slate-100 ml-3" />
                <input
                  type="text"
                  placeholder="Search sales..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="px-4 py-2 focus:outline-none rounded-lg text-white bg-myBgDark-textSoft"
                />
              </div>

              {searchTerm && filteredData.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50">
                  {filteredData.map((item) => (
                    <div
                      key={item._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSearchTerm(item.productName)}
                    >
                      {item.productName}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link href={"/addSales"}>
              <Button className="bg-indigo-600">
                <Plus />
                Add Sales
              </Button>
            </Link>
          </div>
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
                    <TableCell className="text-white">
                      {item.createdAt}
                    </TableCell>
                    <TableCell className="text-white">
                      {item.productId}
                    </TableCell>
                    <TableCell className="text-white">
                      {item.inventoryItem?.productName}
                    </TableCell>
                    <TableCell className="text-white">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-white">
                      {pesoFormatter.format(item.inventoryItem?.price)}
                    </TableCell>
                    {/* <TableCell className="text-white">
                      {item.inventoryItem?.supplier || "N/A"}
                    </TableCell> */}
                    <TableCell className="text-white">{total[index]}</TableCell>
                    <TableCell className="space-x-2">
                      {/* <Link href={`/editProduct/${item._id}`}>Update</Link> */}
                      <EditFormModal id={item._id} />
                      <RemoveBtn id={item._id} onDelete={handleDelete} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-4 text-white"
                  >
                    No data Found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-end items-center m-3 text-center py-4 text-white">
            Grand Totals : {grandTotal}
          </div>

          {/* Pagination */}
          {/* <div className="flex justify-between items-center m-3">
            <Pagination className="flex-grow flex items-center">
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-white cursor-pointer bg-myBgDark-textSoft"
              >
                Previous
              </PaginationPrevious>

              <PaginationContent className="flex-grow flex justify-center">
                <span className="text-sm text-white">
                  Page {currentPage} of {totalPages}
                </span>
              </PaginationContent>

              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-white cursor-pointer bg-myBgDark-textSoft"
              >
                Next
              </PaginationNext>
            </Pagination>
          </div> */}
        </div>
      </div>

      {/* Loading Dialog */}
      <Loading isOpen={loading} onClose={() => setLoading(false)} />
    </>
  );
};

export default SalesInventory;
