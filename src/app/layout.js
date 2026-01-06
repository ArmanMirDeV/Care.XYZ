import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Care.xyz - Baby Sitting & Elderly Care Service Platform",
  description: "Providing reliable and trusted care services for children, elderly, and family members. Making caregiving easy, secure, and accessible for everyone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
