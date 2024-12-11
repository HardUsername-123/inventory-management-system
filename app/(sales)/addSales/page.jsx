"use client";

import axios from "axios";
import { Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import qz from "qz-tray";
import { PrintModal } from "./_components/PrintModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const AddSales = () => {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [products, setProducts] = useState([]);
  const [cash, setCash] = useState(0);
  const [discount, setDiscount] = useState(0); // Discount as a percentage
  const [change, setChange] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Search term for the product
  const [qty, setQty] = useState([]);

  // Mocked product data for the dropdown with stock information
  const [productOptions, setProductOptions] = useState([]);

  const { isAuthenticated } = useAuth(); // Get role and authentication status from context
  const router = useRouter();

  const storedRole = localStorage.getItem("role");

  useEffect(() => {
    if (!isAuthenticated || storedRole !== "user") {
      router.push("/unauthorized"); // Redirect to unauthorized page if not user or not authenticated
      router.refresh();
    }
  }, [isAuthenticated, storedRole, router]);

  if (storedRole !== "user") {
    return null;
  }

  // Define the formatter for PHP currency
  const pesoFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/products");

        if (res.status === 201) {
          // Access the correct data field
          setProductOptions(res.data.products);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const addProduct = (productId) => {
    const product = productOptions.find((p) => p._id === productId);
    if (product && product.stockLevel > 0) {
      setProducts((prev) => [
        ...prev,
        {
          ...product,
          quantity: 1,
          subtotal: product.price,
          uniqueKey: `${product._id}-${Date.now()}`, // Generate a unique key
        },
      ]);
      setSearchTerm(""); // Clear search term after selecting the product
    }
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = [...products];
    const updatedOptions = [...productOptions];

    const product = updatedProducts[index];
    const optionIndex = updatedOptions.findIndex((p) => p._id === product._id);

    // Validate stock availability
    // if (quantity <= 0 || quantity >= updatedOptions[optionIndex].stockLevel) {
    //   alert("Invalid quantity: exceeds available stock.");
    //   return;
    // }
    setQty(quantity);
    if (quantity <= updatedOptions.stockLevel) {
      alert("Invalid quantity: exceeds available stock.");
      return;
    }

    // Update the stock
    const difference = quantity - product.quantity;
    updatedOptions[optionIndex].stockLevel -= difference; // Deduct from stock
    product.quantity = quantity;
    product.subtotal = product.price * quantity;

    setProducts(updatedProducts);
    setProductOptions(updatedOptions);
  };

  const calculateGrandTotal = () => {
    const totalBeforeDiscount = products.reduce(
      (sum, product) => sum + product.subtotal,
      0
    );
    const discountAmount = (totalBeforeDiscount * discount) / 100;
    return totalBeforeDiscount - discountAmount;
  };

  const handleCashChange = (cashAmount) => {
    setCash(cashAmount);
    const grandTotal = calculateGrandTotal();
    setChange(pesoFormatter.format(cashAmount - grandTotal));
  };

  const handleDiscountChange = (discountAmount) => {
    setDiscount(discountAmount);
    // const grandTotal = calculateGrandTotal();
    // setChange(pesoFormatter.format(cash - grandTotal));
  };

  const removeProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product._id !== productId
    );
    setProducts(updatedProducts);
  };

  const filteredProducts = productOptions.filter((product) => {
    const searchTermLower = searchTerm.toLowerCase(); // Cache the lowercased search term for efficiency

    return (
      (product.productName &&
        product.productName.toLowerCase().includes(searchTermLower)) ||
      (product.category &&
        product.category.toLowerCase().includes(searchTermLower)) ||
      (product.productId &&
        product.productId.toLowerCase().includes(searchTermLower))
    );
  });

  return (
    <>
      <div className="m-5 p-4 bg-myBgDark-lifgtDark shadow-md rounded-md">
        <h1 className="text-xl font-bold mb-4 text-white">Customer Details</h1>

        {/* Customer Details */}
        <div className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="Customer Name"
            className="w-full border text-white p-2 rounded-md bg-transparent border-myBgDark-textSoft focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border text-white p-2 rounded-md bg-transparent border-myBgDark-textSoft focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border text-white p-2 rounded-md bg-transparent border-myBgDark-textSoft focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Address"
            className="w-full border text-white p-2 rounded-md bg-transparent border-myBgDark-textSoft focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />
        </div>
      </div>
      <div className="m-5 p-4 bg-myBgDark-lifgtDark shadow-md rounded-md ">
        <h1 className="text-xl text-white font-bold mb-4">Sales Item</h1>
        {/* Searchable Product Input */}
        <div className="mb-4 border rounded-md flex justify-center items-center bg-transparent border-myBgDark-textSoft">
          <Search className="ml-2 w-5 h-5 text-white" />
          <input
            type="text"
            className="w-full  text-white p-2 rounded-md bg-transparent border-myBgDark-textSoft focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search or Scan Barcode"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Product List (only show when search term is not empty and filtered products exist) */}
        {searchTerm && filteredProducts.length > 0 && (
          <div className="relative mb-4 bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                // Validate product properties and set defaults
                const productId =
                  product.productId || `default-id-${product._id}`;
                const productName = product.productName || "Unnamed Product";
                const category = product.category || "Uncategorized";
                const stockLevel = product.stockLevel || 0;

                return (
                  <li
                    key={`${productId}-${productName}`}
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-indigo-50"
                    onClick={() => addProduct(product._id)}
                  >
                    {/* Product Info */}
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-medium">
                        {productName}
                      </span>
                      <span className="text-sm text-gray-500">{category}</span>
                      <span className="text-sm text-gray-400">
                        Product ID: {productId}
                      </span>
                    </div>

                    {/* Price and Stock */}
                    <div className="text-right">
                      <span className="block text-indigo-600 font-semibold">
                        {pesoFormatter.format(product.price)}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          stockLevel > 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stockLevel > 0
                          ? `In Stock: ${stockLevel}`
                          : "Out of Stock"}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Product List Table */}
        {products.length === 0 ? (
          <div>
            <p className="text-center p-4 text-white">No products added yet</p>
          </div>
        ) : (
          <div className="mt-10 ">
            <table className="w-full mb-4 border border-myBgDark-textSoft text-white">
              <thead className="bg-myBgDark-textSoft">
                <tr className="border-b border-myBgDark-textSoft">
                  <th className="p-2 text-left">Product ID</th>
                  <th className="p-2 text-left">Product Name</th>
                  <th className="p-2 text-left">Unit Price</th>
                  <th className="p-2 text-left">Stock</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Subtotal</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.uniqueKey}
                    className="border-b border-myBgDark-textSoft hover:bg-myBgDark-darkBg"
                  >
                    <td className="p-2">{product.productId}</td>
                    <td className="p-2">{product.productName}</td>
                    <td className="p-2">
                      {pesoFormatter.format(product.price)}
                    </td>
                    <td className="p-2">
                      {
                        productOptions.find((p) => p._id === product._id)
                          ?.stockLevel
                      }
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="border border-myBgDark-textSoft p-1 w-20 bg-transparent outline-none"
                        value={isNaN(product.quantity) ? "" : product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            index,
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                    <td className="p-2">
                      {pesoFormatter.format(product.subtotal)}
                    </td>
                    <td className="p-2">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeProduct(product._id)}
                      >
                        <Trash2 /> {/* Trashcan icon */}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="m-5 p-4 bg-myBgDark-lifgtDark shadow-md rounded-md text-white">
        {/* Receipt */}
        <h1 className="text-xl font-bold mb-4">Payment</h1>
        <div className="space-y-2 mb-10">
          <div className="flex justify-between items-center border-b  border-myBgDark-textSoft py-3">
            <label>Discount</label>
            <input
              type="number"
              className="ml-2 border p-2 rounded-md bg-transparent border-myBgDark-textSoft focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={discount}
              // disabled={cash > 0}
              onChange={(e) => handleDiscountChange(parseInt(e.target.value))}
            />
          </div>
          <div className="flex justify-between items-center border-b  border-myBgDark-textSoft py-3">
            <label>Grand Total</label>
            <span className="ml-2">
              {pesoFormatter.format(calculateGrandTotal())}
            </span>
          </div>
          <div className="flex justify-between items-center border-b  border-myBgDark-textSoft py-3">
            <label>Cash</label>
            <input
              type="number"
              className="ml-2 border p-2 rounded-md bg-transparent border-myBgDark-textSoft focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={cash}
              onChange={(e) => handleCashChange(parseInt(e.target.value))}
            />
          </div>
          <div className="flex justify-between items-center border-b  border-myBgDark-textSoft py-3">
            <label>Change</label>
            <span className="ml-2">{change}</span>
          </div>
        </div>
        {/* 
        <button
          // onClick={printReceipt1}
          className="bg-indigo-600 text-white p-2 rounded-md flex justify-end mt-5"
        > */}
        <PrintModal
          customer={customer}
          products={products}
          discount={discount}
          cash={cash}
          change={change}
          total={calculateGrandTotal()}
          qty={qty}
        />
        {/* Complete Sale
        </button> */}
      </div>
    </>
  );
};

export default AddSales;
