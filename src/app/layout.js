import { Outfit, Cinzel } from "next/font/google"; // Luxury fonts
import { AppProvider } from "@/context/AppContext";
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
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
        className={`${outfit.variable} ${cinzel.variable} antialiased bg-dark-950 text-white`}
      >
        <NextAuthSessionProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
