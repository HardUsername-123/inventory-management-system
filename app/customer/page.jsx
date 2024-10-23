"use client";

import React, { useState } from "react";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
    },
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newCustomerData = {
      id: customers.length + 1,
      ...newCustomer,
    };
    setCustomers([...customers, newCustomerData]);
    setNewCustomer({ name: "", email: "", phone: "" });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Customer Management</h2>

      {/* Add Customer Form */}
      <form onSubmit={handleAddCustomer} className="mb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={newCustomer.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter customer name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={newCustomer.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter customer email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={newCustomer.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter customer phone"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Customer
        </button>
      </form>

      {/* Customer List */}
      <h3 className="text-xl font-semibold mb-2">Customer List</h3>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-4 py-2 border">{customer.id}</td>
              <td className="px-4 py-2 border">{customer.name}</td>
              <td className="px-4 py-2 border">{customer.email}</td>
              <td className="px-4 py-2 border">{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
