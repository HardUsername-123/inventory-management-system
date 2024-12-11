"use client";

import React, { useEffect, useState } from "react";
import { LucideListOrdered, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { use } from "react";
import { ScaleLoader } from "react-spinners";
import { toast, Toaster } from "sonner";

const Reorder = ({ params }) => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { stock } = use(params);

  console.log(stock, "Id ni sya");
  // Get role and authentication status from context
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async (stock) => {
      try {
        const res = await axios.get(`/api/products/${stock}`);
        if (res.status === 200) {
          setItem(res.data.getItem);
          console.log(res.data.getItem, "Fetched item");
        } else {
          throw new Error(`Unexpected response: ${res.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error?.response?.data?.message || "Failed to fetch data.");
      }
    };

    fetchData(stock);
  }, [stock]);

  const [role, setRole] = useState("");

  useEffect(() => {
    // Get the role from localStorage
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  if (!isAuthenticated) {
    return null; // Optionally, return null or a loading state until the user is authenticated
  }

  const handleReorderClick = async (supplierName) => {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ supplierName }),
      });

      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Error sending email");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-5">
        <div className="overflow-x-auto h-[550px] w-full bg-myBgDark-lifgtDark rounded-lg px-3">
          <Table className="min-w-full bg-myBgDark-lifgtDark shadow-md rounded-lg no-scrollbar mt-10">
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Product ID</TableHead>
                <TableHead className="text-white">Product Name</TableHead>
                <TableHead className="text-white">Category</TableHead>
                <TableHead className="text-white">Stock Level</TableHead>
                <TableHead className="text-white">Price</TableHead>
                <TableHead className="text-white">Supplier</TableHead>
                {role === "admin" && (
                  <TableHead className="text-white">Action</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {item ? (
                <TableRow className="hover:bg-myBgDark-darkBg">
                  <TableCell className="text-white">
                    {new Date().toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-white">{item.productId}</TableCell>
                  <TableCell className="text-white">
                    {item.productName}
                  </TableCell>
                  <TableCell className="text-white">{item.category}</TableCell>
                  <TableCell className="text-white">
                    {item.stockLevel}
                  </TableCell>
                  <TableCell className="text-white">{item.price}</TableCell>
                  <TableCell className="text-white">{item.supplier}</TableCell>
                  {role === "admin" && (
                    <TableCell>
                      <Button
                        onClick={async () => {
                          try {
                            setLoading(true);
                            const reorderMessage = `Hello, we need to reorder the product: ${item.productName} (ID: ${item.productId}). Please deliver us.`;
                            const response = await axios.post(
                              "/api/sendEmail",
                              {
                                supplierId: item.supplier,
                                message: reorderMessage,
                              }
                            );

                            if (response.status === 200) {
                              // alert("Reorder request sent successfully!");
                              toast.success(
                                "Reorder request sent successfully!"
                              );
                            }
                          } catch (error) {
                            console.error(
                              "Error sending reorder request:",
                              error
                            );
                            alert("Failed to send reorder request.");
                          } finally {
                            setLoading(false);
                          }
                        }}
                        className="bg-green-500 hover:bg-green-600 rounded-full"
                      >
                        {loading ? (
                          <ScaleLoader color="#ffffff" size={15} />
                        ) : (
                          <>
                            <LucideListOrdered />
                            Reorder
                          </>
                        )}
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell className="text-white" colSpan={3}>
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Toaster richColors />
      </div>

      {/* Loading Dialog */}
      {/* <Loading isOpenb={loading} onClose={() => setLoading(false)} /> */}
    </>
  );
};

export default Reorder;
