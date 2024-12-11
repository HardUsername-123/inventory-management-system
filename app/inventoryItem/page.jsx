"use client";
import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { AddModal } from "./_components/AddModal";
import RemoveBtn from "./_components/RemoveBtn";
import EditProduct, {
  EditForm,
  EditFormModal,
} from "./_components/EditFormModal";
import { InfinitySpin, Triangle } from "react-loader-spinner";
import Loading from "../_components/Loading";
import { Search } from "lucide-react";
import Swal from "sweetalert2";

const InventoryItem = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateId, setUpadateId] = useState([]);

  // Set the number of items per page
  const itemsPerPage = 7;

  // Define the formatter for PHP currency
  const pesoFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  // Fetch data when the component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/products");

        if (res.status === 201) {
          // Access the correct data field
          setProduct(res.data.products);
          setLoading(false);

          res.data.products.forEach((product) => {
            console.log("Product ID:", product.productId); // Access the id
            setUpadateId(product.id);
          });

          // Function to show alert for each low stock product
          // const showAlertsSequentially = async (products, index = 0) => {
          //   // Ensure we're within bounds of the products array
          //   if (index < products.length) {
          //     const product = products[index];

          //     try {
          //       // Show the alert for the current product
          //       await swal({
          //         position: "top-end",
          //         icon: "warning",
          //         title: `Reorder alert for ${product.productName}: stock level is below ${product.stockLevel}.`,
          //         showConfirmButton: true,
          //       });

          //       // Make the axios request to reorder after the alert is dismissed
          //       await axios.post("/api/reorder", {
          //         productId: product.productId,
          //         productName: product.productName,
          //         category: product.category,
          //         stockLevel: product.stockLevel,
          //         price: product.price,
          //         supplier: product.supplier,
          //       });
          //       // Continue with the next product
          //       await showAlertsSequentially(products, index + 1);
          //     } catch (error) {
          //       console.error("Error processing product:", product, error);
          //       swal({
          //         position: "top-end",
          //         icon: "error",
          //         title: `Failed to reorder ${product.productName}: ${
          //           error.response?.data?.message || error.message
          //         }`,
          //         showConfirmButton: true,
          //       });
          //     }
          //   }
          // };

          // Check stock levels and show individual reorder alerts if necessary
          const lowStockProducts = res.data.products.filter(
            (product) => product.stockLevel < 10
          );

          // // Start showing alerts if there are low stock products
          // if (lowStockProducts.length > 0) {
          //   showAlertsSequentially(lowStockProducts);
          // }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Calculate the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Choose the data to paginate: either the filtered data or the full product list
  const dataToShow = searchTerm ? filteredData : product;
  const currentItems = dataToShow.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages based on the current data (filtered or full)
  const totalPages = Math.ceil(dataToShow.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Function to handle adding a new product
  const handleAdd = (newProduct) => {
    // Append the new product to the current state
    setProduct([...product, newProduct]);
  };

  const handleUpdate = (updatedProduct) => {
    setProduct((prevProducts) =>
      prevProducts.map((product) =>
        updateId === updatedProduct.productId ? updatedProduct : product
      )
    );
  };

  // Function to handle deletion and update the state
  const handleDelete = (id) => {
    // Remove deleted item from product array
    setProduct(product.filter((item) => item._id !== id));
  };

  // Handle search input and filter data
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = product.filter(
        (item) =>
          item.productName.toLowerCase().includes(value.toLowerCase()) ||
          // Convert productId to string
          item.productId.toString().toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleSelectSearchItem = (item) => {
    setSearchTerm(item.productName || item.productId);
    setFilteredData([]); // Clear search results
  };

  return (
    <>
      <div className="p-5">
        {/* <div>
          <h1 className="text-2xl mb-5  text-white">Inventory</h1>
        </div> */}
        {/* Table */}
        <div className="overflow-x-auto h-[600px] w-full bg-myBgDark-lifgtDark rounded-lg px-3">
          {/* Search Box */}
          <div className="flex justify-between my-3">
            <div className="w-72 relative">
              <div className="flex items-center rounded-lg bg-myBgDark-textSoft">
                <Search className="w-5 h-5 text-slate-100 ml-3" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="px-4 py-2 focus:outline-none rounded-lg text-white bg-myBgDark-textSoft"
                />
              </div>
              {searchTerm && filteredData.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg z-50">
                  {filteredData.map((item) => (
                    <div
                      key={item._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectSearchItem(item)}
                    >
                      {item.productName || item.productId}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <AddModal onAdd={handleAdd} />
          </div>
          <Table className="min-w-full bg-myBgDark-lifgtDark shadow-md rounded-lg no-scrollbar mt-10">
            <TableHeader className="bg-myBgDark-textSoft">
              <TableRow>
                <TableHead className="text-white ">Date Created</TableHead>
                <TableHead className="text-white ">Product ID</TableHead>
                <TableHead className="text-white ">Product Name</TableHead>
                <TableHead className="text-white ">Category</TableHead>
                <TableHead className="text-white ">Stock Level</TableHead>
                <TableHead className="text-white ">Price</TableHead>
                <TableHead className="text-white ">Supplier</TableHead>
                <TableHead className="text-white ">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-none">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
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
                      {item.productName}
                    </TableCell>
                    <TableCell className="text-white">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-white">
                      {item.stockLevel}
                    </TableCell>
                    <TableCell className="text-white">
                      {pesoFormatter.format(item.price)}
                    </TableCell>
                    <TableCell className="text-white">
                      {item.supplier}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Link href={`/editProduct/${item._id}`}>
                        <Button
                          aria-label="Edit"
                          variant="outline"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <PencilIcon />
                        </Button>
                      </Link>
                      {/* <EditFormModal id={item._id} onUpdate={handleUpdate} /> */}
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
          <div className="text-white font-bold flex justify-end items-center mr-20">
            {product.length} Items (s)
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
      </div>

      {/* Loading Dialog */}
      <Loading isOpen={loading} onClose={() => setLoading(false)} />
    </>
  );
};

export default InventoryItem;
