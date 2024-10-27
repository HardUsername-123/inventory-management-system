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
import axios from "axios";
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
  const [sales, setSales] = useState([]);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [grandTotal, setGrandTotal] = useState("");
  const [totalSalesCount, setTotalSalesCount] = useState(0);
  const [totalStockLevel, setTotalStockLevel] = useState(0);
  const [loading, setLoading] = useState(true);

  const pesoFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("/api/sales");
        const salesData = response.data.sales;

        // Get all sales data
        const lastSevenSales = salesData;

        // Aggregate sales data by product
        const aggregatedSales = lastSevenSales.reduce((acc, sale) => {
          const productName =
            sale.inventoryItem?.productName || "Unknown Product";
          const price = sale.inventoryItem?.price || 0;
          const quantity = sale.quantity || 0;

          if (!acc[productName]) {
            acc[productName] = {
              total: 0,
              quantity: 0,
              price: price,
            };
          }

          // Update totals for existing products
          acc[productName].total += price * quantity;
          acc[productName].quantity += quantity;

          return acc;
        }, {});

        // Prepare the sales data for charting
        const salesDataForChart = Object.entries(aggregatedSales).map(
          ([productName, data]) => ({
            name: productName,
            total: data.total,
            quantity: data.quantity,
          })
        );

        // Update sales state
        setSales(salesDataForChart);

        // Calculate the grand total
        const grandTotalValue = salesDataForChart.reduce(
          (acc, curr) => acc + curr.total,
          0
        );
        setGrandTotal(pesoFormatter.format(grandTotalValue));

        // Calculate total sales count (sum of quantities sold)
        const totalSales = salesDataForChart.reduce(
          (acc, sale) => acc + sale.quantity,
          0
        );
        setTotalSalesCount(totalSales);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/products");

        if (res.status === 201) {
          const productData = res.data.products; // Access the products data
          setProduct(productData);

          // Calculate the total stock level by summing the stockLevel of each product
          const stockSum = productData.reduce(
            (total, product) => total + (product.stockLevel || 0),
            0
          );

          setTotalStockLevel(stockSum); // Update the total stock level state

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: sales.map((sale) => sale.name), // Use product names as labels
    datasets: [
      {
        label: "Sales",
        data: sales.map((sale) => sale.total), // Total sales for each product
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Chart bar color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Overview",
        color: "#fff",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  if (loading)
    return <Loading isOpen={loading} onClose={() => setLoading(false)} />;

  return (
    <div className="px-6 my-5 space-y-8 overflow-hidden">
      <div>
        <h1 className="text-2xl text-white">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow flex items-center">
          <CollectionIcon className="h-12 w-12 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Stock Products</h3>
            <p className="text-4xl font-bold mt-2">{totalStockLevel}</p>
          </div>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow flex items-center">
          <ShoppingCartIcon className="h-12 w-12 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Stock Sales</h3>
            <p className="text-4xl font-bold mt-2">{totalSalesCount}</p>
          </div>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow flex items-center">
          <CurrencyDollarIcon className="h-12 w-12 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-4xl font-bold mt-2">{grandTotal}</p>
          </div>
        </div>
      </div>

      <div className="bg-myBgDark-lifgtDark p-6 rounded-lg shadow">
        {sales.length === 0 ? (
          <div className="text-center text-white">No sales found</div>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
      {/* <Loading isOpen={loading} onClose={() => setLoading(false)} /> */}
    </div>
  );
};

export default Dashboard;
