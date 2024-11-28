import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin: Revenda de Gado Biduca",
  description: "Área administrativa da Revenda Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
