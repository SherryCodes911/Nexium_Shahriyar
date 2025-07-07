"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <header className="py-4 bg-card shadow-sm">
          <div className="container flex justify-between items-center">
            <h1 className="text-2xl font-bold">Quote Generator</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
            </Button>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="py-4 bg-card text-center text-sm text-muted-foreground">
          <div className="container">
            Made by <a href="https://shahriyar-site.vercel.app/" className="underline">Shahriyar</a>
          </div>
        </footer>
      </body>
    </html>
  );
}