import { Outfit, Inter } from "next/font/google"; // Luxury fonts
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Royal Car | Premium Concierge & Dispatch",
  description: "Elite chauffeur service and fleet management dispatch console. Experience luxury travel with our simplified booking system.",
  keywords: "chauffeur, luxury car, dispatch console, fleet management, limo service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-dark-950 text-white`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
