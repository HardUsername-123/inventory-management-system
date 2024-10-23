"use client";

import React, { useState } from "react";

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Supplier A",
      email: "supplierA@example.com",
      phone: "123-456-7890",
      address: "123 Main St, City A",
    },
    {
      id: 2,
      name: "Supplier B",
      email: "supplierB@example.com",
      phone: "987-654-3210",
      address: "456 Oak St, City B",
    },
  ]);

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    const newSupplierData = {
      id: suppliers.length + 1,
      ...newSupplier,
    };
    setSuppliers([...suppliers, newSupplierData]);
    setNewSupplier({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Supplier Management</h2>

      {/* Add Supplier Form */}
      <form onSubmit={handleAddSupplier} className="mb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={newSupplier.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter supplier name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={newSupplier.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter supplier email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={newSupplier.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter supplier phone"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={newSupplier.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter supplier address"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Supplier
        </button>
      </form>

      {/* Supplier List */}
      <h3 className="text-xl font-semibold mb-2">Supplier List</h3>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Address</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td className="px-4 py-2 border">{supplier.id}</td>
              <td className="px-4 py-2 border">{supplier.name}</td>
              <td className="px-4 py-2 border">{supplier.email}</td>
              <td className="px-4 py-2 border">{supplier.phone}</td>
              <td className="px-4 py-2 border">{supplier.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierManagement;
