import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Sidebar from "./_components/Sidebar";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({ subsets: ["latin"] });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Henry's Hardware",
  description: "Henrys harware inventory management system",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="md:grid md:grid-cols-12">
          <aside className="col-span-2 md:col-span-3">
            <Sidebar />
          </aside>

          <main className="col-span-9 md:col-span-9 bg-myBgDark-darkBg max-h-screen overflow-scroll">
            <Header />
            {children}
          </main>
          <Toaster />
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
