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

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [supplierId, setSupplierId] = useState([]);
  const [supplier, setSupplier] = useState("");

  useEffect(() => {
    const getCustomerById = async (id) => {
      try {
        const res = await axios.get(`/api/customer/${id}`);

        if (res.status !== 200) {
          throw new Error("Failed to fetch Product");
        } else {
          const customer = res.data.getItem;
          setData(customer);
          setCustomerId(customer.customerId || "");
          setName(customer.name || "");
          setEmail(customer.email || "");
          setPhone(customer.phone || 0);
          setAddress(customer.address || 0);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCustomerById(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerId || !name || !email || !phone || !address) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const res = await axios.put(`/api/customer/${id}`, {
        customerId,
        name,
        email,
        phone,
        address,
      });

      if (res.status !== 201) {
        throw new Error("Failed to update the product");
      }

      setOpen(false);

      toast.success("Customer updated successfully.");

      router.push("/customer");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the customer.");
    }
  };

  return (
    <div className="w-3/5 bg-myBgDark-lifgtDark m-5 p-5 rounded-lg text-slate-100">
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
          Update Customer
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
