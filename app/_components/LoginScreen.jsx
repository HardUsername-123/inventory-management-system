"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Eye, HardHat, MessageCircleWarning, User } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import PrivacyPolicyModal from "./PrivatePolicy";

export default function LoginScreen({ children }) {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Set loading to false initially

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Required all fields");
      return;
    }

    setLoading(true); // Set loading to true when the form is submitted

    try {
      const res = await axios.post("/api/authLogin", {
        username,
        password,
      });

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Log in",
          text: "Log in Successfully.",
        });

        const data = res.data;

        login("MyToken");

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        setUsername("");
        setPassword("");

        router.refresh();
        router.push("/");
      } else {
        Swal.fire({
          title: "Log in failed",
          text: "Invalid credentials.",
          icon: "warning",
        });

        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to log in. Please try again."
      );
    } finally {
      setLoading(false); // Set loading back to false after the operation completes
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-myBgDark-lightDark">
        {/* Header */}
        <header className="bg-myBgDark-darkBg py-4 px-6 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/hardware_logo.png"
                width={300}
                height={300}
                alt="Logo"
                className="mr-2"
              />
            </div>
            <PrivacyPolicyModal />
          </div>
        </header>

        {/* Main Section */}
        <main className="flex-1 bg-myBgDark-lifgtDark">
          <section className="relative flex flex-wrap lg:items-center">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
              <div className="mx-auto max-w-lg text-center">
                <div className="flex justify-center items-center">
                  <Image
                    src={"/hardware_logo.png"}
                    width={300}
                    height={300}
                    alt="myLogo"
                  />
                </div>
                <p className="mt-4 text-slate-50">
                  A Comprehensive Point of Sale System for Seamless
                  Transactions, Intelligent Inventory Management, and Enhanced
                  Customer Engagement
                </p>
              </div>

              <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg text-white border border-myBgDark-textSoft p-4 pe-12 text-sm shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <User className="size-4 text-gray-400" />
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full rounded-lg border border-myBgDark-textSoft bg-transparent p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <Eye className="size-4 text-gray-400" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-5">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`inline-block rounded-lg px-5 py-3 text-sm font-medium w-full ${
                      loading
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                      </div>
                    ) : (
                      "Log in"
                    )}
                  </button>
                </div>

                {error && (
                  <span className="m-5 flex justify-center items-center mt-5">
                    <div className="bg-myBgDark-textSoft w-fit p-4 rounded-lg">
                      <p className="text-red-500">{error}</p>
                    </div>
                  </span>
                )}
              </form>
            </div>

            <div className="h-64 w-full sm:h-96 lg:h-full lg:w-1/2 flex justify-center items-center">
              <Image
                alt=""
                src="login.svg"
                width={100}
                height={100}
                objectFit="contain"
                className="inset-0 h-full w-full object-contain p-10"
              />
            </div>
            <Toaster richColors />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-myBgDark-darkBg py-6">
          <div className="text-center text-white text-sm">
            &copy; {new Date().getFullYear()} Hardware POS. All rights reserved.
            @Anthony Dev
          </div>
        </footer>
      </div>
    );
  }

  return <>{children}</>;
}
