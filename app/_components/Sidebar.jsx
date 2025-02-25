"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  UserPlus,
  Calendar,
  CreditCard,
  LogOut,
  Users,
  FileText,
  LayoutDashboard,
  Box,
  HardHat,
  ChevronDownCircle,
  Coins,
  Presentation,
  MapPinHouse,
  NotepadText,
  BaggageClaim,
  PlusCircle,
  ClipboardPen,
  ShoppingCart,
} from "lucide-react"; // Import icons from lucide-react
import { PaperClipIcon, UserGroupIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [role, setRole] = useState("");

  const pathName = usePathname();

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

  return (
    <div className="flex h-screen flex-col justify-between border-b bg-myBgDark-lifgtDark">
      <div className="px-4 py-6 pl-5">
        <Link href={"/"} prefetch>
          {/* <h1 className="text-2xl font-bold text-white pl-5">
            <HardHat className="inline-block w-9 h-9 mr-2 text-white" />
            Hardware <span className="text-indigo-600"> Shop</span>
          </h1> */}
          <Image
            src={"/hardware_logo.png"}
            width={300}
            height={300}
            alt="myLogo"
          />
        </Link>

        <ul className="mt-10 space-y-1">
          <li>
            <Link
              href={"/"}
              className={`block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100 ${
                pathName === "/" ? "bg-myBgDark-textSoft" : ""
              }`}
              prefetch
            >
              <LayoutDashboard className="inline-block w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>

          {role === "user" && (
            <>
              {/* <Link
              href={"/sales"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
            >
              <Coins className="inline-block w-5 h-5 mr-2" />
              Sales
            </Link> */}
              <li>
                <Link
                  href={"/sales"}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100 ${
                    pathName === "/sales" ? "bg-myBgDark-textSoft" : ""
                  }`}
                  prefetch
                >
                  <Coins className="inline-block w-5 h-5 mr-2" />
                  Sales List
                </Link>
              </li>

              <li>
                <Link
                  href={"/addSales"}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100 ${
                    pathName === "/addSales" ? "bg-myBgDark-textSoft" : ""
                  }`}
                  prefetch
                >
                  <PlusCircle className="inline-block w-5 h-5 mr-2" />
                  Add Sales
                </Link>
              </li>

              <li>
                <Link
                  href={"/reportSales"}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100 ${
                    pathName === "/reportSales" ? "bg-myBgDark-textSoft" : ""
                  }`}
                  prefetch
                >
                  <NotepadText className="inline-block w-5 h-5 mr-2" />
                  Report
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              href={"/order"}
              className={`block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100 ${
                pathName === "/order" ? "bg-myBgDark-textSoft" : ""
              }`}
              prefetch
            >
              <ShoppingCart className="inline-block w-5 h-5 mr-2" />
              Order
            </Link>
          </li>
          {role === "admin" && (
            <>
              <li>
                <Link
                  href={"/inventoryItem"}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100 ${
                    pathName === "/inventoryItem" ? "bg-myBgDark-textSoft" : ""
                  }`}
                  prefetch
                >
                  <Box className="inline-block w-5 h-5 mr-2" />
                  Inventory
                </Link>
              </li>
              {/* <li>
                <Link
                  href={"/cashierReport"}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100 ${
                    pathName === "/cashierReport" ? "bg-myBgDark-textSoft" : ""
                  }`}
                >
                  <ClipboardPen className="inline-block w-5 h-5 mr-2" />
                  Sales Report
                </Link>
              </li> */}

              <li>
                <Link
                  href={"/customer"}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100 ${
                    pathName === "/customer" ? "bg-myBgDark-textSoft" : ""
                  }`}
                  prefetch
                >
                  <UserGroupIcon className="inline-block w-5 h-5 mr-2" />
                  Customers
                </Link>
              </li>

              <li>
                <Link
                  href={"/suplier"}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100 ${
                    pathName === "/supplier" ? "bg-myBgDark-textSoft" : ""
                  }`}
                  prefetch
                >
                  <MapPinHouse className="inline-block w-5 h-5 mr-2" />
                  Suppliers
                </Link>
              </li>

              <li>
                <Link
                  href={"/user"}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100 ${
                    pathName === "/user" ? "bg-myBgDark-textSoft" : ""
                  }`}
                  prefetch
                >
                  <UserGroupIcon className="inline-block w-5 h-5 mr-2" />
                  Users
                </Link>
              </li>
            </>
          )}
          {/* 
          <li>
            <a
              href="#"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
            >
              <CreditCard className="inline-block w-5 h-5 mr-2" />
              Billing
            </a>
          </li>

          <li>
            <Link
              href={"/invoise"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
            >
              <FileText className="inline-block w-5 h-5 mr-2" />
              Invoices
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
