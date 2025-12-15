import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virtual Family Christmas Card 2025",
  description: "A festive family Christmas card with trivia, memories, and music!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
