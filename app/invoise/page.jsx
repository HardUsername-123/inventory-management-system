import React from "react";

const Invoice = () => {
  // Dummy sale data
  const sale = {
    id: "INV12345",
    productName: "Product A",
    quantity: 3,
    price: 150,
    total: 450,
    date: "2024-10-20",
  };

  // Destructure the sale data
  const { id, productName, quantity, price, total, date } = sale;

  return (
    <div className="border border-gray-300 p-6 my-4 rounded-lg bg-gray-50 max-w-md mx-auto shadow-md">
      <h2 className="text-xl font-bold mb-4">Invoice</h2>

      {/* Invoice Information */}
      <div className="mb-4">
        <p className="mb-2">
          <strong>Invoice ID:</strong> {id}
        </p>
        <p>
          <strong>Date:</strong> {date}
        </p>
      </div>

      {/* Sales Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">Product Name</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">{productName}</td>
            <td className="px-4 py-2 border">{quantity}</td>
            <td className="px-4 py-2 border">${price}</td>
            <td className="px-4 py-2 border">${total}</td>
          </tr>
        </tbody>
      </table>

      {/* Total */}
      <div className="mt-6 text-right">
        <h3 className="text-lg font-semibold">Total: ${total}</h3>
      </div>
    </div>
  );
};

export default Invoice;
