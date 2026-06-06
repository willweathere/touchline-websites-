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
        {/* Ambient faint-neon glow behind everything (sits over the black bg) */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-[6%] h-[30rem] w-[30rem] rounded-full bg-neon-cyan/[0.06] blur-[130px]" />
          <div className="absolute top-[28%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-neon-purple/[0.07] blur-[130px]" />
          <div className="absolute top-[58%] left-[-8%] h-[28rem] w-[28rem] rounded-full bg-neon-pink/[0.05] blur-[130px]" />
          <div className="absolute bottom-[-12%] right-[16%] h-[28rem] w-[28rem] rounded-full bg-neon-green/[0.05] blur-[130px]" />
        </div>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
