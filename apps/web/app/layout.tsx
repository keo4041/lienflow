import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "LienFlow™ | QuickBooks to Certified Mail",
  description: "Turn QuickBooks invoices into legally compliant certified mail.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-safety-orange/30">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
