import { Bell, ShoppingCart } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationBell() {
  const [product, setProduct] = useState([]);
  const [stock, setStock] = useState([]);
  const [role, setRole] = useState("");

  // Ref to store the previous stock state
  const prevStockRef = useRef([]);

  useEffect(() => {
    // Get the role from localStorage
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null; // Return null if the user is not authenticated
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/products");

        if (res.status === 201) {
          setProduct(res.data.products);

          // Filter low-stock products
          const lowStockProducts = res.data.products.filter(
            (product) => product.stockLevel < 10
          );

          // Compare with previous stock state to detect new alerts
          const prevStock = prevStockRef.current;
          const newLowStock = lowStockProducts.filter(
            (product) => !prevStock.some((prev) => prev._id === product._id) // New products only
          );

          // Show toast for new low-stock products
          if (newLowStock.length > 0) {
            newLowStock.forEach((product) => {
              toast.success(
                `New reorder alert: ${product.productName} has low stock (Stock: ${product.stockLevel})`,
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            });
          }

          // Update stock and ref
          setStock(lowStockProducts);
          prevStockRef.current = lowStockProducts;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();

    // Set interval for real-time updates (optional)
    const interval = setInterval(getData, 1000); // Update every 60 seconds
    return () => clearInterval(interval);
  });

  return (
    <>
      <ToastContainer /> {/* Toast container for React Toastify */}
      <div className="relative">
        <DropdownMenu>
          {/* Trigger for the Dropdown */}
          <DropdownMenuTrigger asChild>
            <button className="relative text-slate-100 hover:text-slate-500 focus:outline-none">
              {/* Notification Badge */}
              {stock.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {stock.length}
                </span>
              )}
              <ShoppingCart className="text-slate-100 w-7 h-7 hover:text-slate-300" />
            </button>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          <DropdownMenuContent className="mt-2 w-100 mr-5 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <DropdownMenuLabel>Low Stock Alerts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {stock.length > 0 ? (
              stock.map((notification) => (
                <DropdownMenuItem key={notification._id}>
                  <Link href={`/reorder/${notification._id}`}>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Reorder alert for {notification.productName}: stock level
                      is below {notification.stockLevel}. Sales:{" "}
                      {notification.sales}.
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem className="text-sm text-gray-500">
                No low stock alerts
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
