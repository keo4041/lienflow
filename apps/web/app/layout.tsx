import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import "../styles/globals.css";
import { Inter, Roboto_Slab } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-slab',
});

export const metadata: Metadata = {
  title: "LienFlow™ | QuickBooks to Certified Mail",
  description: "Turn QuickBooks invoices into legally compliant certified mail. Zero manual data entry. USPS CASS verified.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="${inter.variable} ${robotoSlab.variable}">
      <body className="antialiased selection:bg-safety-orange/30">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
