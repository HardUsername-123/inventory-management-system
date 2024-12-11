import escpos from "escpos";

// Import USB functionality for the printer
escpos.USB = require("escpos-usb");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { receiptText } = req.body;

    if (!receiptText) {
      return res.status(400).json({ error: "Receipt text is required." });
    }

    try {
      const device = new escpos.USB(); // Automatically detects the USB printer
      const printer = new escpos.Printer(device);

      // Open the printer and print the receipt
      device.open(() => {
        printer
          .font("a") // Default font
          .align("ct") // Center align
          .style("normal") // Normal style
          .text(receiptText) // Receipt content
          .cut() // Cut the paper
          .close(() =>
            res.status(200).json({ message: "Receipt printed successfully." })
          );
      });
    } catch (error) {
      console.error("Printer error:", error);
      res.status(500).json({ error: "Failed to print the receipt." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
