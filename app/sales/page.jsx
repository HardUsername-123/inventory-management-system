import React from "react";

const SalesInventory = () => {
  const salesData = [
    { id: 1, productName: "Product A", quantity: 5, price: 100, total: 500 },
    { id: 2, productName: "Product B", quantity: 3, price: 150, total: 450 },
    { id: 3, productName: "Product C", quantity: 2, price: 200, total: 400 },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Sales Inventory</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Product Name</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id} className="text-center">
                <td className="px-4 py-2 border">{sale.id}</td>
                <td className="px-4 py-2 border">{sale.productName}</td>
                <td className="px-4 py-2 border">{sale.quantity}</td>
                <td className="px-4 py-2 border">${sale.price}</td>
                <td className="px-4 py-2 border">${sale.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesInventory;
