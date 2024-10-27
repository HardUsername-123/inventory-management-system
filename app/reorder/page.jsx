import React from "react";
import RemoveBtn from "../inventoryItem/_components/RemoveBtn";
import { EditFormModal } from "../inventoryItem/_components/EditFormModal";
import { Search } from "lucide-react";
import { AddModal } from "../inventoryItem/_components/AddModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Reorder = () => {
  return (
    <>
      <div className="p-5">
        <div>
          <h1 className="text-2xl mb-5  text-white">Reorder Stock</h1>
        </div>
        {/* Table */}
        <div className="overflow-x-auto h-[550px] w-full bg-myBgDark-lifgtDark rounded-lg px-3">
          {/* Search Box */}
          <div className="flex justify-between my-3">
            <div className="w-72">
              <div className="flex items-center rounded-lg bg-myBgDark-textSoft">
                <Search className="w-5 h-5 text-slate-100 ml-3" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  //   value={searchTerm}
                  //   onChange={handleSearch}
                  className="px-4 py-2 focus:outline-none rounded-lg text-white bg-myBgDark-textSoft "
                />
              </div>

              {/* {searchTerm && filteredData.length > 0 && (
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
              )} */}
            </div>
            <AddModal />
          </div>
          <Table className="min-w-full bg-myBgDark-lifgtDark shadow-md rounded-lg no-scrollbar">
            <TableHeader>
              <TableRow>
                <TableHead className="text-white ">Date Created</TableHead>
                <TableHead className="text-white ">ID</TableHead>
                <TableHead className="text-white ">Product Name</TableHead>
                <TableHead className="text-white ">Category</TableHead>
                <TableHead className="text-white ">Stock Level</TableHead>
                <TableHead className="text-white ">Price</TableHead>
                <TableHead className="text-white ">Supplier</TableHead>
                <TableHead className="text-white ">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-none">
              <TableRow className="border-none hover:bg-myBgDark-darkBg">
                <TableCell className="text-white">45/34/00</TableCell>
                <TableCell className="text-white">iteam 105</TableCell>
                <TableCell className="text-white">lansang</TableCell>
                <TableCell className="text-white">lansang</TableCell>
                <TableCell className="text-white">120</TableCell>
                <TableCell className="text-white">23000</TableCell>
                <TableCell className="text-white">Supplier 101</TableCell>
                <TableCell className="space-x-2">
                  {/* <Link href={`/editProduct/${item._id}`}>Update</Link> */}
                  <EditFormModal />
                  <RemoveBtn />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

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
      {/* <Loading isOpen={loading} onClose={() => setLoading(false)} /> */}
    </>
  );
};

export default Reorder;
