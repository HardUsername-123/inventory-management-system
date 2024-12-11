import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Sidebar from "./_components/Sidebar";

import LoginScreen from "./_components/LoginScreen";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Hardware Shop",
  description: "Henry's Hardware Inventory Management System",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <link rel="icon" href={metadata.icons.icon} />
        </head>
        <body className={outfit.className}>
          <LoginScreen>
            <div className="md:grid md:grid-cols-12">
              <aside className="col-span-2 md:col-span-3">
                <Sidebar />
              </aside>
              <main className="col-span-9 md:col-span-9 bg-myBgDark-darkBg max-h-screen overflow-scroll no-scrollbar">
                <Header />
                {children}
                <Footer />
              </main>
              <Toaster richColors />
            </div>
          </LoginScreen>
        </body>
      </html>
    </AuthProvider>
  );
}
