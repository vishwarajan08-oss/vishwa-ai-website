import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Core Consulting | AI for Wealth Management",
  description: "Implementing intelligent systems across wealth management, financial research, and operations. Your team spends less time on process and more time on clients.",
  metadataBase: new URL("https://vishwa-ai-consulting.vercel.app"),
  openGraph: {
    title: "Core Consulting | AI for Wealth Management",
    description: "Implementing intelligent systems across wealth management, financial research, and operations.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Core Consulting | AI for Wealth Management",
    description: "Implementing intelligent systems across wealth management, financial research, and operations.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-white bg-[#0A0A0A] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <ClientLayout>
            {children}
          </ClientLayout>
        </main>
        <Footer />
      </body>
    </html>
  );
}
