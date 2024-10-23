"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  CollectionIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/outline";
import { Chart } from "./Chart";
import Loading from "./Loading";

// Register components for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Example data
  const totalProducts = 150;
  const totalSales = 500;
  const totalRevenue = 25000;

  // Example product data for chart
  const products = [
    { name: "Product A", sold: 30 },
    { name: "Product B", sold: 45 },
    { name: "Product C", sold: 20 },
  ];

  // Chart data for sales
  const chartData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Products Sold",
        data: products.map((product) => product.sold),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Product Sales",
      },
    },
  };

  return (
    <div className="px-6 my-5 space-y-8">
      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Products */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow flex items-center">
          <CollectionIcon className="h-12 w-12 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-4xl font-bold mt-2">{totalProducts}</p>
          </div>
        </div>

        {/* Total Sales */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow flex items-center">
          <ShoppingCartIcon className="h-12 w-12 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-4xl font-bold mt-2">{totalSales}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow flex items-center">
          <CurrencyDollarIcon className="h-12 w-12 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-4xl font-bold mt-2">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {/* Product Sales Chart */}
      <div>
        {/* <h2 className="text-2xl font-bold mb-4">Sales Chart</h2>
     <div className="bg-white p-3 shadow rounded-lg">
       <Bar data={chartData} options={chartOptions} />
     </div> */}
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
