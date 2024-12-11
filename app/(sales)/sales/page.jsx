"use client";

import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Search, Printer } from "lucide-react";
import axios from "axios";
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
import { EditFormModal } from "./_components/EditFormModal";
import RemoveBtn from "./_components/RemoveBtn";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { logoBase64 } from "@/lib/base64";
import Loading from "@/app/_components/Loading";

const SalesInventory = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);
  const [total, setTotals] = useState([]);
  const [grandTotal, setGrandTotal] = useState();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { isAuthenticated } = useAuth(); // Get role and authentication status from context
  const router = useRouter();

  const storedRole = localStorage.getItem("role");

  useEffect(() => {
    if (!isAuthenticated || storedRole !== "user") {
      router.push("/unauthorized"); // Redirect to unauthorized page if not user or not authenticated
      router.refresh();
    }
  }, [isAuthenticated, storedRole, router]);

  if (storedRole !== "user") {
    return null;
  }

  const itemsPerPage = 10;

  const pesoFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  // Function to calculate totals
  const calculateTotals = (salesData) => {
    const calculatedTotals = salesData.map((sale) => {
      const price = sale.inventoryItem?.price || 0;
      const quantity = sale.quantity || 0;
      return price * quantity;
    });

    const formattedTotals = calculatedTotals.map((total) =>
      pesoFormatter.format(total)
    );
    setTotals(formattedTotals);

    const grandTotalValue = calculatedTotals.reduce(
      (acc, curr) => acc + curr,
      0
    );
    setGrandTotal(pesoFormatter.format(grandTotalValue));
  };

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("/api/sales");
        const salesData = response.data.sales;
        setSales(salesData);

        calculateTotals(salesData);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchSales();
  });

  // Calculate the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Choose the data to paginate: either the filtered data or the full product list
  const dataToShow = searchTerm ? filteredData : sales;
  const currentItems = dataToShow.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages based on the current data (filtered or full)
  const totalPages = Math.ceil(dataToShow.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Function to handle deletion and update the state
  const handleDelete = (id) => {
    const updatedSales = sales.filter((item) => item._id !== id);
    setSales(updatedSales);
    calculateTotals(updatedSales); // Recalculate totals after deletion
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = sales.filter(
        (item) =>
          item.inventoryItem?.productName
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.productId.toString().toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  //PDF function
  const handlePrintPDF = () => {
    const doc = new jsPDF();

    doc.addImage(logoBase64, "PNG", 14, 10, 80, 20); // Adjust x, y, width, height as needed

    // Add title below the logo
    doc.setFontSize(16);
    doc.text("Sales Report", 14, 50);

    const tableData = (filteredData.length > 0 ? filteredData : sales).map(
      (item, index) => [
        item.createdAt,
        item.productId,
        item.inventoryItem?.productName || "N/A",
        item.quantity,
        pesoFormatter.format(item.inventoryItem?.price || 0),
        pesoFormatter.format(
          (item.quantity || 0) * (item.inventoryItem?.price || 0)
        ),
      ]
    );

    // doc.text("Sales Record", 14, 10);
    doc.autoTable({
      startY: 60,
      head: [
        ["Date Created", "ID", "Product Name", "Quantity", "Price", "Total"],
      ],
      body: tableData,
    });
    // Additional information after the table
    const finalY = doc.lastAutoTable.finalY; // Position after the table
    doc.text(`Total Items: ${sales.length}`, 14, finalY + 10);
    doc.text(`Grand Total: ${grandTotal}`, 14, finalY + 20);
    doc.save("sales_record.pdf");
  };

  return (
    <div className="p-5">
      <div className="overflow-x-auto h-[550px] w-full bg-myBgDark-lifgtDark rounded-lg px-3">
        <div className="flex justify-between my-3">
          <div className="w-72 relative">
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
          </div>
          <div>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={handlePrintPDF}
            >
              <Printer />
              Print Record
            </Button>
          </div>
        </div>

        <Table className="min-w-full bg-myBgDark-lifgtDark shadow-md rounded-lg no-scrollbar mt-10">
          <TableHeader className="bg-myBgDark-textSoft">
            <TableRow>
              <TableHead className="text-white">Date Created</TableHead>
              <TableHead className="text-white">Product ID</TableHead>
              <TableHead className="text-white">Product Name</TableHead>
              <TableHead className="text-white">Category</TableHead>
              <TableHead className="text-white">Quantity</TableHead>
              <TableHead className="text-white">Price</TableHead>
              <TableHead className="text-white">Total</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-none">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <TableRow
                  key={item._id}
                  className="border-none hover:bg-myBgDark-darkBg"
                >
                  <TableCell className="text-white">{item.createdAt}</TableCell>
                  <TableCell className="text-white">{item.productId}</TableCell>
                  <TableCell className="text-white">
                    {item.inventoryItem?.productName}
                  </TableCell>
                  <TableCell className="text-white">
                    {item.inventoryItem?.category}
                  </TableCell>
                  <TableCell className="text-white">{item.quantity}</TableCell>
                  <TableCell className="text-white">
                    {pesoFormatter.format(item.inventoryItem?.price)}
                  </TableCell>
                  <TableCell className="text-white">{total[index]}</TableCell>
                  <TableCell className="space-x-2">
                    {/* <Link href={`/editProduct/${item._id}`}>Update</Link> */}
                    {/* <EditFormModal id={item._id} /> */}
                    <RemoveBtn id={item._id} onDelete={handleDelete} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-white">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="text-white font-bold flex justify-end items-center mx-3 mt-5">
          {sales.length} Item(s)
        </div>
        <div className="flex justify-end items-center m-3 text-center py-4 text-white">
          <p className="font-bold mr-5">Grand Total: </p> {grandTotal}
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center m-3">
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
        </div>
      </div>
      {/* Loading Dialog */}
      <Loading isOpen={loading} onClose={() => setLoading(false)} />
    </div>
  );
};
export default SalesInventory;
