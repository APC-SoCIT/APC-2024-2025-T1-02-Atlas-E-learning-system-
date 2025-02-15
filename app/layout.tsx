import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// Define metadata for the whole web app
export const metadata: Metadata = {
  title: "Atlas",
  description: "An e-learning platform for the Philippine Army",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Dependency for LDRS loader component */}
        <script
          type="module"
          defer
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/dotPulse.js"
        />
        <main>{children}</main>
        {/* For pop-up messages */}
        <Toaster />
      </body>
    </html>
  );
}
