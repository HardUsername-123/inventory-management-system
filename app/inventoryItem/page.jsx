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
import { EditModal } from "./_components/EditModal";
import EditProduct, {
  EditForm,
  EditFormModal,
} from "./_components/EditFormModal";
import { InfinitySpin, Triangle } from "react-loader-spinner";
import Loading from "../_components/Loading";
import CustomSearch from "./_components/SearchItem";
import { Search } from "lucide-react";

const InventoryItem = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set the number of items per page
  const itemsPerPage = 5;

  // Fetch data when the component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/products");

        if (res.status === 201) {
          setProduct(res.data.getProduct);
          setLoading(false);
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
  const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages based on the product data
  const totalPages = Math.ceil(product.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle search input and filter data
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value !== "") {
      const filtered = product.filter((item) =>
        item.productName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <>
      <div className="p-5">
        {/* Search Box */}
        {/* <div className="w-72">
          <div className="flex items-center rounded-lg  bg-myBgDark-textSoft">
            <Search className="w-5 h-5 text-myBgDark-lifgtDark ml-3" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 focus:outline-none rounded-lg text-white bg-myBgDark-textSoft placeholder-slate-50"
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
                  <Link href={`/details/${item._id}`}>{item.productName}</Link>
                </div>
              ))}
            </div>
          )}
        </div> */}

        <div className="overflow-x-auto h-[500px] w-full bg-myBgDark-lifgtDark rounded-lg px-3">
          <div className="flex justify-between my-3">
            <CustomSearch
              handleSerch={handleSearch}
              searchTerm={searchTerm}
              filteredData={filteredData}
            />
            <AddModal />
          </div>
          <Table className="min-w-full  bg-myBgDark-lifgtDark shadow-md rounded-lg ">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="text-white ">ID</TableHead>
                <TableHead className="text-white ">Product Name</TableHead>
                <TableHead className="text-white ">Category</TableHead>
                <TableHead className="text-white ">Stock Level</TableHead>
                <TableHead className="text-white ">Price</TableHead>
                <TableHead className="text-white ">Location</TableHead>
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
                    <TableCell className="text-white">{item.price}</TableCell>
                    <TableCell className="text-white">
                      {item.location}
                    </TableCell>
                    <TableCell className="space-x-2">
                      {/* Edit Button */}
                      {/* <Link href={`/editProduct/${item._id}`}>
                        <PencilIcon className="h-5 w-5" />
                      </Link> */}
                      <EditFormModal id={item._id} />
                      {/* Delete Button */}
                      <RemoveBtn id={item._id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-4 text-white"
                  >
                    No data Found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-3">
          <Pagination>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-white cursor-pointer"
            >
              Previous
            </PaginationPrevious>
            <PaginationContent>
              <span className="text-sm text-white">
                Page {currentPage} of {totalPages}
              </span>
            </PaginationContent>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-white cursor-pointer"
            >
              Next
            </PaginationNext>
          </Pagination>
        </div>
      </div>

      {/* Loading Dialog */}
      <Loading isOpen={loading} onClose={() => setLoading(false)} />
    </>
  );
};

export default InventoryItem;
