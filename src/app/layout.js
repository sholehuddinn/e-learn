import { Geist, Geist_Mono } from "next/font/google";
import { ExamProvider } from "@/context/ExamContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Learning Dukun Listrik",
  description: "Platform E-Learning untuk Dukun Listrik, hanya untuk saya dan projek senang-senang saja",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ExamProvider>
          {children}
        </ExamProvider>
      </body>
    </html>
  );
}
