import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Vishwa Rajan | AI Consulting",
  description: "Implementing intelligent systems across wealth management, financial research, and operations — so your team spends less time on process and more time on clients.",
  metadataBase: new URL("https://vishwa-ai-consulting.vercel.app"),
  openGraph: {
    title: "Vishwa Rajan | AI Consulting",
    description: "Implementing intelligent systems across wealth management, financial research, and operations.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishwa Rajan | AI Consulting",
    description: "Implementing intelligent systems across wealth management, financial research, and operations.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-[#171717] bg-[#ffffff] min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
