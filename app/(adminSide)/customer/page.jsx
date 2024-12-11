"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast, Toaster } from "sonner";
import RemoveBtn from "./_components/RemoveBtn";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useAuth(); // Get role and authentication status from context
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/customer", {
        customerId,
        name,
        email,
        phone,
        address,
      });

      if (res.status === 201) {
        toast.success("Success added customer");

        setCustomerId("");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await axios.get("/api/customer");

        setCustomers(res.data.getCustomers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  });

  const storedRole = localStorage.getItem("role");

  useEffect(() => {
    if (!isAuthenticated || storedRole !== "admin") {
      router.push("/unauthorized"); // Redirect to unauthorized page if not admin or not authenticated
      router.refresh();
    }
  }, [isAuthenticated, storedRole, router]);

  if (storedRole !== "admin") {
    return null;
  }

  const handleDelete = (id) => {
    // Remove deleted item from product array
    setCustomers(customers.filter((item) => item._id !== id));
  };

  return (
    <div className="min-h-screen">
      <div className=" m-5 p-4 bg-myBgDark-lifgtDark shadow-md rounded-md text-white">
        <h2 className="text-2xl font-semibold mb-4">Customer Management</h2>

        {/* Add Customer Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-semibold">Customer ID</label>
              <input
                type="text"
                name="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full p-2 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter customer customer ID"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter customer name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter customer email"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter customer phone"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter customer address"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Add Customer
          </button>
        </form>
      </div>
      <div className="m-5 p-4 bg-myBgDark-lifgtDark shadow-md rounded-md text-white">
        {/* Customer List */}
        <h3 className="text-xl font-semibold mb-2">Customer List</h3>
        <table className="min-w-full bg-myBgDark-lifgtDark border border-myBgDark-textSoft rounded-lg">
          <thead>
            <tr className="bg-myBgDark-textSoft ">
              <th className="px-4 py-2 text-left">Customer ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id} className="hover:bg-myBgDark-darkBg">
                  <td className="px-4 py-2 border border-myBgDark-textSoft">
                    {customer.customerId}
                  </td>
                  <td className="px-4 py-2 border border-myBgDark-textSoft">
                    {customer.name}
                  </td>
                  <td className="px-4 py-2 border border-myBgDark-textSoft">
                    {customer.email}
                  </td>
                  <td className="px-4 py-2 border border-myBgDark-textSoft">
                    {customer.phone}
                  </td>
                  <td className="px-4 py-2 border border-myBgDark-textSoft">
                    {customer.address}
                  </td>
                  <td className="px-4 py-2 border border-myBgDark-textSoft">
                    <Link href={`/customer/editCustomer/${customer._id}`}>
                      <Button
                        aria-label="Edit"
                        variant="outline"
                        className="text-blue-500 hover:text-blue-700 mr-3"
                      >
                        <PencilIcon />
                      </Button>
                    </Link>
                    <RemoveBtn id={customer._id} onDelete={handleDelete} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-3">
                  No customer found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default CustomerManagement;
