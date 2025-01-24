import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple Todo list application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-darkGray text-white min-h-screen flex flex-col">
        <header className="bg-black h-[20vh] flex items-center justify-center relative">
          <h1 className="text-4xl font-sans font-bold flex items-center gap-2">
            <Rocket className="text-blue h-8 w-8" />
            <span>
              <span className="text-blue">Todo</span>{" "}
              <span className="text-purple">App</span>
            </span>
          </h1>
        </header>

        <main className="flex-1 pt-12 flex justify-center relative">
          {children}
        </main>
      </body>
    </html>
  );
}
