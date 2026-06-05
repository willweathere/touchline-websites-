import "./globals.css";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata = {
  title: "Touchline Websites — Websites That Help Your Business Grow",
  description:
    "Modern, fast, conversion-focused websites for growing businesses. Clear pricing from £99. Get a free quote in under 3 minutes.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05060B",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${grotesk.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
