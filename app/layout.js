import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  icons: {
    icon: "/favicon.svg",
  },
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
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-charcoal bg-bg min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-burgundy focus:text-white focus:rounded focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main-content" className="flex-grow">
          <ClientLayout>
            {children}
          </ClientLayout>
        </main>
        <Footer />
      </body>
    </html>
  );
}
