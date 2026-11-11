import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plin — Clima, CEP e Contato",
  description: "Previsão do tempo por geolocalização, busca de CEP pelo endereço e formulário de contato.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-black`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
