import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plano Arq | Arquitetura & Design",
  description:
    "Escritório de arquitetura premium especializado em projetos residenciais, comerciais e de interiores de alto padrão.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-stone-50 text-stone-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
