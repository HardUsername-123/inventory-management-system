"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    item: "",
    category: "",
    quantity: "",
    date: "",
  });

  // Fetch customer data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("/api/customer");
        setCustomers(res.data.getCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  // Add order and display in the table
  const handleAddOrder = () => {
    if (
      !newOrder.customerName ||
      !newOrder.item ||
      !newOrder.category ||
      !newOrder.quantity ||
      !newOrder.date
    ) {
      alert("Please fill out all fields to complete the order.");
      return;
    }

    const newId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;
    const orderToAdd = {
      id: newId,
      ...newOrder,
      quantity: Number(newOrder.quantity),
    };

    setOrders([...orders, orderToAdd]);

    // Clear the form fields
    setNewOrder({
      customerName: "",
      item: "",
      category: "",
      quantity: "",
      date: "",
    });
  };

  return (
    <div className="min-h-screen py-10">
      <div className="mx-5 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Order Management</h1>

        {/* Add Order Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="customer" className="block font-medium">
              Customer
            </label>
            <select
              id="customer"
              name="customerName"
              value={newOrder.customerName}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>
                Choose a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.customerId} value={customer.name}>
                  {customer.name}
                </option>
              ))}
            </select>
            {newOrder.customerName && (
              <p className="mt-2 text-sm text-gray-600">
                Selected Customer: <strong>{newOrder.customerName}</strong>
              </p>
            )}
          </div>

          {/* Other input fields */}
          <input
            type="text"
            name="item"
            placeholder="Item"
            value={newOrder.item}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newOrder.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newOrder.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="date"
            name="date"
            value={newOrder.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Add Order Button */}
          <button
            onClick={handleAddOrder}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Complete Order
          </button>
        </div>

        {/* Orders Table */}
        <table className="w-full mt-6 border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Item</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="border p-2 text-center">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border p-2">{order.id}</td>
                  <td className="border p-2">{order.customerName}</td>
                  <td className="border p-2">{order.item}</td>
                  <td className="border p-2">{order.category}</td>
                  <td className="border p-2">{order.quantity}</td>
                  <td className="border p-2">{order.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
