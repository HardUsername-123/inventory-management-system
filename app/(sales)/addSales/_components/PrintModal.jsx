import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Printer } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export const PrintModal = ({
  customer,
  products,
  discount,
  cash,
  change,
  total,
  qty,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pesoFormatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  const router = useRouter();

  const handlePrint = () => {
    const receiptContent = document.getElementById("receipt").innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<html><body>${receiptContent}</body></html>`);

    router.push("/sales");
    router.refresh();
    // Add the event listener for after printing
    newWindow.onafterprint = async () => {
      try {
        // Gather sales data
        const sales = products.map(({ productId, quantity }) => ({
          productId,
          quantity,
        }));

        if (sales.length === 0) {
          alert("No products to submit.");
          return;
        }

        // Make POST request to the sales API
        const res = await axios.post("/api/sales", { sales });

        if (res.status === 201) {
          // Clear the form and reset states
          // setCustomer({ name: "", phone: "", email: "" });
          // setProducts([]);
          // setCash(0);
          // setDiscount(0);
          // setChange(0);

          alert("Receipt printed successfully!");
        }
      } catch (error) {
        console.error("Error submitting sales:", error);
        alert("Failed to record sales. Please try again.");
      }

      newWindow.close();
    };

    newWindow.print();
  };

  const handleCompleteSale = () => {
    // Validate if products and cash are provided
    if (!products || products.length === 0 || !cash) {
      Swal.fire({
        title: "Transaction Failed",
        text: "Please complete the transaction.",
        icon: "warning",
      });
      return;
    }

    // Check if payment is insufficient
    if (cash < total) {
      // alert("Your payment is not enough. Please provide sufficient payment.");
      toast.error(
        "Your payment is not enough. Please provide sufficient payment."
      );
      return;
    }

    // Open modal if all validations pass
    setIsModalOpen(true);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <span
        onClick={handleCompleteSale}
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md  mt-5 cursor-pointer"
      >
        Complete Sale
      </span>
      <DialogContent>
        <DialogTitle>Print Receipt</DialogTitle>
        <div className="flex flex-col justify-center items-center">
          <div
            id="receipt"
            style={{ width: "58mm", fontFamily: "monospace" }}
            className="my-10 bg-slate-200 p-4 rounded-sm"
          >
            {/* <h3 className="mb-10" style={{ textAlign: "center" }}>
              Hardware Shop
            </h3> */}
            <div className="mb-10 text-center">
              <Image
                src={"/hardware_logo.png"}
                width={300}
                height={300}
                alt="myLogo"
              />
            </div>
            <p className="mb-5" style={{ textAlign: "center" }}>
              Date: {new Date().toLocaleString()}
            </p>
            <hr />
            <p>Customer Name: {customer.name}</p>
            <p>Contact No.: {customer.phone}</p>
            <p>Email: {customer.email}</p>
            <p>Address: {customer.address}</p>
            <hr />
            <div className="mt-2">
              {products.map((item, index) => (
                <div
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{item.productName}</span>

                  <span>Qty: {item.quantity}</span>

                  <span>{pesoFormatter.format(item.price)}</span>
                </div>
              ))}
            </div>
            <hr />
            <div
              className="mt-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Discount:</span>
              <span>{discount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Total:</span>
              <span>{pesoFormatter.format(total)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Cash:</span>
              <span>{pesoFormatter.format(cash)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Change:</span>
              <span>{change}</span>
            </div>
            <hr />
            <p className="mt-10" style={{ textAlign: "center" }}>
              Thank you!
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-3 p-2 rounded-md flex justify-center items-center mt-5 text-center"
          >
            <Printer />
            Print Receipt
          </button>
        </div>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};
