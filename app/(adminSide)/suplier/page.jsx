"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Loading from "@/app/_components/Loading";
import { toast, Toaster } from "sonner";
import RemoveBtn from "./_components/RemoveBtn";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

const SupplierManagement = () => {
  const { isAuthenticated } = useAuth(); // Get role and authentication status from context
  const router = useRouter();

  const [suppliers, setSuppliers] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/supplier", {
        supplierId,
        name,
        email,
        phone,
        address,
      });

      if (res.status === 201) {
        toast.success("Success added supplier");

        setSupplierId("");
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
    const getSupplier = async () => {
      try {
        const res = await axios.get("/api/supplier");

        setSuppliers(res.data.getSupplier);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getSupplier();
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
    setCustomers(suppliers.filter((item) => item._id !== id));
  };

  return (
    <div className="min-h-screen">
      <div className="m-5 mx-5 p-6 bg-myBgDark-lifgtDark rounded-lg shadow-md text-white">
        <h2 className="text-2xl font-semibold mb-4">Supplier Management</h2>

        {/* Add Supplier Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 font-semibold">Supplier ID</label>
              <input
                type="text"
                name="name"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                className="w-full p-2 border border-myBgDark-textSoft bg-transparent  focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
                placeholder="Enter supplier id"
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
                className="w-full p-2 border border-myBgDark-textSoft bg-transparent  focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
                placeholder="Enter supplier name"
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
                className="w-full p-2 border  border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter supplier email"
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
                className="w-full p-2 border  border-myBgDark-textSoft bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter supplier phone"
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
                placeholder="Enter supplier address"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Add Supplier
          </button>
        </form>
      </div>
      <div className="m-5 mx-5 p-6 bg-myBgDark-lifgtDark rounded-lg shadow-md text-white">
        {/* Supplier List */}
        <h3 className="text-xl font-semibold mb-2">Supplier List</h3>
        <table className="min-w-full bg-myBgDark-lifgtDark border border-myBgDark-textSoft rounded-lg">
          <thead>
            <tr className="bg-myBgDark-textSoft">
              <th className="px-4 py-2 text-left">Supplier ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <tr key={supplier._id} className="hover:bg-myBgDark-darkBg">
                  <td className="px-4 py-2 border border-myBgDark-textSoft">
                    {supplier.supplierId}
                  </td>
                  <td className="px-4 py-2 border border-myBgDark-textSoft">
                    {supplier.name}
                  </td>
                  <td className="px-4 py-2 border border-myBgDark-textSoft">
                    {supplier.email}
                  </td>
                  <td className="px-4 py-2 border border-myBgDark-textSoft">
                    {supplier.phone}
                  </td>
                  <td className="px-4 py-2 border border-myBgDark-textSoft">
                    {supplier.address}
                  </td>
                  <td className="flex items-center px-4 py-2 border border-myBgDark-textSoft">
                    <Link href={`/suplier/editSupplier/${supplier._id}`}>
                      <Button
                        aria-label="Edit"
                        variant="outline"
                        className="text-blue-500 hover:text-blue-700 mr-3"
                      >
                        <PencilIcon />
                      </Button>
                    </Link>
                    <RemoveBtn id={supplier._id} onDelete={handleDelete} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-3">
                  No supplier found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Toaster richColors />;{/* Loading Dialog */}
      <Loading isOpen={loading} onClose={() => setLoading(false)} />
    </div>
  );
};

export default SupplierManagement;
