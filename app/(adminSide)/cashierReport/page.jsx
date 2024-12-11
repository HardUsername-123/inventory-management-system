"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const CashierReport = () => {
  const { isAuthenticated } = useAuth(); // Get role and authentication status from context
  const router = useRouter();

  const storedRole = localStorage.getItem("role");

  useEffect(() => {
    if (!isAuthenticated || storedRole !== "admin") {
      router.push("/unauthorized"); // Redirect to unauthorized page if not admin or not authenticated
      router.refresh();
    }
  }, [isAuthenticated, storedRole, router]);

  if (storedRole !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen  py-10 px-5">
      <div className="max-w-7xl mx-auto bg-myBgDark-lifgtDark p-6 rounded-lg shadow-lg">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-slate-100">
            Cashier Report
          </h1>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Generate Report
          </button>
        </div>

        {/* Report Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-myBgDark-textSoft">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium text-slate-100">
                  Transaction ID
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-slate-100">
                  Date
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-slate-100">
                  Amount
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-slate-100">
                  Cashier
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-slate-100">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr className="hover:bg-myBgDark-darkBg ">
                <td className="py-3 px-4 text-sm text-slate-100 border border-myBgDark-textSoft">
                  TXN123456
                </td>
                <td className="py-3 px-4 text-sm text-slate-100 border border-myBgDark-textSoft">
                  2024-12-01
                </td>
                <td className="py-3 px-4 text-sm text-slate-100 border border-myBgDark-textSoft">
                  $150.00
                </td>
                <td className="py-3 px-4 text-sm text-slate-100 border border-myBgDark-textSoft">
                  John Doe
                </td>
                <td className="py-3 px-4 text-sm text-slate-100 border border-myBgDark-textSoft">
                  <span className="text-green-500 font-semibold">
                    Completed
                  </span>
                </td>
              </tr>
              {/* More rows can be added here */}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing 1-10 of 50 reports</p>
          <div className="space-x-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierReport;
