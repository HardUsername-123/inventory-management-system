import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure Multer storage
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = "./public/uploads";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }); // Ensure directory exists
      }
      cb(null, uploadDir); // Files will be saved in public/uploads
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const extension = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
  }),
});

// Use next-connect to handle middleware in Next.js API route
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Something went wrong! ${error.message}` });
  },
});

apiRoute.use(upload.single("image")); // Use Multer middleware

// POST request handler
apiRoute.post((req, res) => {
  const fileUrl = `/uploads/${req.file.filename}`; // URL to access uploaded file
  res.status(200).json({ message: "Image uploaded successfully", fileUrl });
});

export default apiRoute;

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};
