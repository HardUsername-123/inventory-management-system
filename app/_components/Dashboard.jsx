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
import { useAuth } from "@/context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContactRound, ListFilterIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [users, setUsers] = useState([]);

  const [role, setRole] = useState("");

  useEffect(() => {
    // Get the role from localStorage
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const { isAuthenticated } = useAuth(); // Get role and authentication status from context

  console.log("...///", role);

  if (!isAuthenticated) {
    return null; // Optionally, return null or a loading state until the user is authenticated
  }

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

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/getUser");

        // Save user data to state
        setUsers(response.data.getUsers);
        console.log(response.data.getUsers);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.message || "An error occurred");
      }
    };
    fetchUserData();
  });

  const updatedUsers = users.slice(1);

  if (loading)
    return <Loading isOpen={loading} onClose={() => setLoading(false)} />;

  return (
    <div className="px-6 my-5 space-y-8 overflow-hidden">
      {/* <div>
        <h1 className="text-2xl text-white">Dashboard</h1>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-500 hover:bg-green-400 text-white p-6 rounded-lg shadow flex items-center">
          <CollectionIcon className="h-12 w-12 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Stock Products</h3>
            <p className="text-4xl font-bold mt-2">{totalStockLevel}</p>
          </div>
        </div>

        <div className="bg-blue-500  hover:bg-blue-400 text-white p-6 rounded-lg shadow flex items-center">
          <ShoppingCartIcon className="h-12 w-12 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Stock Sales</h3>
            <p className="text-4xl font-bold mt-2">{totalSalesCount}</p>
          </div>
        </div>

        <div className="bg-yellow-500 hover:bg-yellow-400 text-white p-6 rounded-lg shadow flex items-center">
          <CurrencyDollarIcon className="h-12 w-12 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-4xl font-bold mt-2">{grandTotal}</p>
          </div>
        </div>
      </div>

      {role === "admin" && (
        <>
          <div className="">
            {/* Table */}
            <div className="overflow-x-auto w-full bg-myBgDark-lifgtDark rounded-lg px-3">
              {/* Search Box */}
              <div className="flex justify-between my-3">
                <div>
                  <h1 className="text-lg font-semibold mb-5 text-center text-slate-100 items-center">
                    <ContactRound className="inline-block w-7 h-7 mr-2" />
                    Cashier List
                  </h1>
                </div>
              </div>
              <Table className="min-w-full bg-myBgDark-lifgtDark rounded-lg no-scrollbar mt-5 mb-5">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white ">Cashier</TableHead>
                    <TableHead className="text-white ">Username</TableHead>
                    <TableHead className="text-white ">Password</TableHead>
                    <TableHead className="text-white ">Affiliation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border-none">
                  {updatedUsers.map((user, index) => (
                    <TableRow
                      key={index}
                      className="border-none hover:bg-myBgDark-darkBg"
                    >
                      <TableCell className="text-white">
                        <div className="flex items-center">
                          {/* <img
                            src={
                              user.image
                                ? user.image
                                : "https://via.placeholder.com/100"
                            }
                            alt={
                              user.name ? `${user.name}'s Profile` : "Profile"
                            }
                            className="size-10 rounded-full object-cover mr-5"
                          /> */}
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-white">
                        {user.username}
                      </TableCell>
                      <TableCell className="text-white">
                        {user.password}
                      </TableCell>
                      <TableCell className="text-white">
                        {user.affiliation}
                      </TableCell>
                      {/* <TableCell className="space-x-2">
                        <Button className="bg-red-500 hover:bg-red-600 rounded-full">
                          <Trash2 />
                          Remove
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {/* <div className="flex justify-between items-center m-3">
               <Pagination className="flex-grow flex items-center">
                 <PaginationPrevious
                   onClick={() => handlePageChange(currentPage - 1)}
                   disabled={currentPage === 1}
                   className="text-white cursor-pointer bg-myBgDark-textSoft"
                 >
                   Previous
                 </PaginationPrevious>
   
                 <PaginationContent className="flex-grow flex justify-center">
                   <span className="text-sm text-white">
                     Page {currentPage} of {totalPages}
                   </span>
                 </PaginationContent>
   
                 <PaginationNext
                   onClick={() => handlePageChange(currentPage + 1)}
                   disabled={currentPage === totalPages}
                   className="text-white cursor-pointer bg-myBgDark-textSoft"
                 >
                   Next
                 </PaginationNext>
               </Pagination>
             </div> */}
            </div>
          </div>

          {/* Loading Dialog */}
          {/* <Loading isOpen={loading} onClose={() => setLoading(false)} /> */}
        </>
      )}

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
