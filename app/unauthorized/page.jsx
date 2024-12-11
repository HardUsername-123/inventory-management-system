"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import the useRouter hook

const Unauthorized = () => {
  const router = useRouter(); // Initialize the useRouter hook

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Unauthorized Access
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Sorry, you don't have permission to view this page.
        </p>

        <div className="space-x-4">
          {/* <button
            onClick={() => router.back()} // Use router.back() to go back
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            Go Back
          </button> */}
          <Link href={"/"}>
            <button className="px-6 py-2 bg-gray-800 text-white text-center rounded-lg hover:bg-gray-700">
              <Home className="inline-block w-5 h-5 mr-2" />
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
