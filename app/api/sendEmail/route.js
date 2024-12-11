// import nodemailer from "nodemailer";

// export async function POST(req) {
//   try {
//     const { email, status } = await req.json();

//     // Configure Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com", // Replace with your SMTP provider
//       port: 587,
//       secure: false, // true for port 465
//       auth: {
//         user: process.env.USER_EMAIL, // Replace with your email
//         pass: process.env.USER_PASS, // Replace with your password
//       },
//     });

//     // Define the email content
//     const subject =
//       status === "accepted" ? "Booking Accepted" : "Booking Cancelled";
//     const html = `
//       <html>
//         <head>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               background-color: #f4f4f4;
//               margin: 0;
//               padding: 0;
//             }
//             .email-container {
//               max-width: 600px;
//               margin: 0 auto;
//               background-color: #ffffff;
//               border-radius: 8px;
//               padding: 20px;
//               box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             }
//             .email-header {
//               text-align: center;
//               padding-bottom: 20px;
//             }
//             .email-header img {
//               max-width: 120px;
//             }
//             .email-body {
//               font-size: 16px;
//               line-height: 1.6;
//               color: #333;
//             }
//             .status {
//               font-weight: bold;
//               color: #007bff;
//             }
//             .footer {
//               text-align: center;
//               font-size: 14px;
//               color: #777;
//               margin-top: 30px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="email-container">
//             <div class="email-header">
//               <!-- Replace the src with your logo image URL -->
//               <img src="https://pix4free.org/assets/library/2021-05-25/originals/health.jpg" alt="Company Logo">
//             </div>

//             <div class="email-body">
//               <h1>Your Booking Request</h1>
//               <p>We are writing to inform you that your booking request has been <strong class="status">${status}</strong>.</p>
//               <p>Thank you for using our service!</p>
//             </div>

//             <div class="footer">
//               <p>&copy; 2024 MicroFlux. All rights reserved.</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     // Send the email
//     await transporter.sendMail({
//       from: "Admin" + process.env.USER_EMAIL, // Sender address
//       to: email, // Receiver's email
//       subject,
//       html,
//     });

//     return new Response(
//       JSON.stringify({ message: "Email sent successfully." }),
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return new Response(JSON.stringify({ message: "Failed to send email." }), {
//       status: 500,
//     });
//   }
// }

import nodemailer from "nodemailer";
import connectMongoDB from "@/lib/mongodb";
import Supplier from "@/models/supplier";

export async function POST(req) {
  const { supplierId, message } = await req.json();

  if (!supplierId || !message) {
    return new Response(
      JSON.stringify({ message: "Missing supplierId or message" }),
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();
    const supplier = await Supplier.findOne({ supplierId: supplierId });

    if (!supplier) {
      return new Response(JSON.stringify({ message: "Supplier not found" }), {
        status: 404,
      });
    }

    const supplierEmail = supplier.email;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            text-align: center;
            padding-bottom: 20px;
          }
          .email-header img {
            max-width: 120px;
          }
          .email-body {
            text-align: center;
            font-size: 16px;
            line-height: 1.6;
            color: #333;
          }
          .status {
            font-weight: bold;
            color: #007bff;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #777;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <!-- Replace the src with your logo image URL -->
            <img src="https://watermark.lovepik.com/photo/20211209/large/lovepik-may-1-labor-day-hardware-tools-picture_501738914.jpg" alt="Company Logo">
          </div>
  
          <div class="email-body">
            <h1>HARDWARE SHOP</h1>
            <p>We are writing to inform you <strong class="status">${message}</strong>.</p>
            <p>Thank you for using our service!</p>
          </div>

  
          <div class="footer">
            <p>&copy; 2024 MicroFlux. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    const mailOptions = {
      from: "HARDWARE SHOP" + process.env.USER_EMAIL,
      to: supplierEmail,
      subject: "Reorder Request",
      html,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500,
    });
  }
}
