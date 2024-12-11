"use client";

import { Bell, HardHat, LogOut, PenTool } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationBell from "./Notification";
import axios from "axios";
import UsersProfile from "./UsersProfile";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState();

  function formatPathName(pathName) {
    const basePath = pathName.split("/");

    // Handle paths
    if (pathName === "/") {
      return "Dashboard";
    } else if (basePath[1] === "reorder") {
      return "Reorder Stock";
    } else if (basePath[1] === "suplier") {
      return "Suppliers";
    } else if (basePath[1] === "sales") {
      return "Sales List";
    } else if (basePath[1] === "adminProfile") {
      return "Profile";
    } else if (basePath[1] === "editProfile") {
      return "Update Profile";
    } else if (basePath[1] === "editProduct") {
      return "Update Product";
    } else if (basePath[1] === "customer" && basePath[2] === "editCustomer") {
      return "Update Customer";
    } else if (basePath[1] === "suplier" && basePath[2] === "editSupplier") {
      return "Update Supplier";
    } else if (basePath[1] === "user" && basePath[2] === "editUser") {
      return "Update User";
    }

    // Remove leading slash and split based on camel case
    const formatted = pathName
      .replace(/^\//, "") // Remove leading slash
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
    return formatted;
  }

  const pathName = usePathname();

  const title = formatPathName(pathName);

  // Fetch user data on component mount
  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("/api/authLogin", {
          headers: {
            // Add the token to the Authorization header
            Authorization: `Bearer ${token}`,
          },
        });

        // Save user data to state
        setUser(response.data.user);
        console.log(response.data.user);

        setUserId(response.data.user._id);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.message || "An error occurred");
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {/* Show loading indicator if loading is true */}
      {loading && (
        <Loading isOpen={loading} onClose={() => setLoading(false)} />
      )}

      <header className="bg-myBgDark-lifgtDark mx-5 mt-5 rounded-lg">
        <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-5 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-lg  text-white">{title}</h1>
            <div className="flex items-center gap-5">
              {/* <button
                className="inline-block rounded bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                type="button"
                onClick={handleLogout} // Call handleLogout on click
              >
                <LogOut className="inline-block w-5 h-5 mr-2" />
                Log out
              </button> */}

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="sticky inset-x-0  bg-myBgDark-lifgtDark">
                    <a
                      href="#"
                      className="flex items-center gap-2 bg-myBgDark-lifgtDark hover:bg-myBgDark-darkBg"
                    >
                      {/* <img
                        src={
                          user && user.image
                            ? user.image
                            : "https://via.placeholder.com/100"
                        }
                        alt={
                          user && user.name
                            ? `${user.name}'s Profile`
                            : "Profile"
                        }
                        className="size-10 rounded-full object-cover"
                      /> */}

                      <div>
                        <p className="text-xs text-slate-100 grid">
                          <span className="font-bold text-sm text-left">
                            {user ? user.name : "Loading..."}
                          </span>

                          <span className="text-sm text-left text-gray-300">
                            {user
                              ? user.affiliation
                                  .toLowerCase()
                                  .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first letter
                              : "Loading..."}
                          </span>
                        </p>
                      </div>
                    </a>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={`/adminProfile/${userId}`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                  {/* <button className="p-3" onClick={logout}>
                    
                  </button> */}
                </DropdownMenuContent>
              </DropdownMenu>
              <NotificationBell />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
