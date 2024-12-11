import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { productName, stockLevel, _id } = req.body;

    try {
      await pusher.trigger("low-stock-channel", "low-stock-alert", {
        productName,
        stockLevel,
        _id,
      });

      res.status(200).json({ message: "Notification sent successfully!" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ message: "Error sending notification" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
