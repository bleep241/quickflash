import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Menu, Zap } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Providers from "@/components/Providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Quickflash⚡",
  description: "AI powered flashcard generator",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 bg-blue-800">
          <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <span className="font-bold text-3xl">QUICKFLA<Zap className="size-8 text-yellow-300 -mt-1 inline-block" />H</span>
              <span className="sr-only">Quickflash</span>
            </Link>
            <Link
              href="/manage"
              className="text-white transition-colors hover:text-foreground"
            >
              Manage
            </Link>
            <Link
              href="/practice"
              className="text-white transition-colors hover:text-foreground"
            >
              Practice
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <span className="sr-only">Quickflash</span>
                </Link>
                <Link href="/manage" className="hover:text-foreground">
                  Manage
                </Link>
                <Link
                  href="/practice"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Practice
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          </div>
        </header>
        <main>
          <Providers>
            {children}
          </Providers>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
