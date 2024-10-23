import Link from "next/link";
import React from "react";
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
} from "lucide-react"; // Import icons from lucide-react
import { PaperClipIcon, UserGroupIcon } from "@heroicons/react/outline";

const Sidebar = () => {
  return (
    <div className="flex h-screen flex-col justify-between border-b bg-myBgDark-lifgtDark">
      <div className="px-4 py-6">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold px-4 text-white">
            <HardHat className="inline-block w-9 h-9 mr-2 text-white" />
            Henry's <span className="text-indigo-600"> Hardware</span>
          </h1>
        </Link>

        <ul className="mt-6 space-y-1">
          <li>
            <Link
              href={"/"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
            >
              <LayoutDashboard className="inline-block w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href={"/inventoryItem"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
            >
              <Box className="inline-block w-4 h-4 mr-2" />
              Inventory
            </Link>
          </li>

          <li>
            <Link
              href={"/sales"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
            >
              <Coins className="inline-block w-4 h-4 mr-2" />
              Sales
            </Link>
          </li>

          <li>
            <Link
              href={"/reportSales"}
              className="block rounded-lg px-4 py-2 text-sm font-mediumtext-white text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
            >
              <PaperClipIcon className="inline-block w-4 h-4 mr-2" />
              Report
            </Link>
          </li>

          <li>
            <Link
              href={"/customer"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
            >
              <UserGroupIcon className="inline-block w-4 h-4 mr-2" />
              Customers
            </Link>
          </li>

          <li>
            <Link
              href={"/suplier"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
            >
              <Presentation className="inline-block w-4 h-4 mr-2" />
              Supliers
            </Link>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-myBgDark-textSoft hover:text-slate-100">
                <span className="text-sm font-medium"> Teams </span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <ChevronDownCircle className="w-4 h-4" />
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
                  >
                    Banned Users
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
                  >
                    <Calendar className="inline-block w-4 h-4 mr-2" />
                    Calendar
                  </a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <a
              href="#"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
            >
              <CreditCard className="inline-block w-4 h-4 mr-2" />
              Billing
            </a>
          </li>

          <li>
            <Link
              href={"/invoise"}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
            >
              <FileText className="inline-block w-4 h-4 mr-2" />
              Invoices
            </Link>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-myBgDark-textSoft hover:text-slate-100">
                <span className="text-sm font-medium"> Account </span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
                  >
                    Details
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-myBgDark-textSoft hover:text-slate-100"
                  >
                    Security
                  </a>
                </li>

                <li>
                  <form action="#">
                    <button
                      type="submit"
                      className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-slate-100"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </form>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0  bg-myBgDark-lifgtDark">
        <a
          href="#"
          className="flex items-center gap-2 bg-myBgDark-lifgtDark p-4 hover:bg-myBgDark-darkBg"
        >
          <img
            alt=""
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="size-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs text-white">
              <strong className="block font-medium">Eric Frusciante</strong>

              <span> eric@frusciante.com </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
