import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import { HydrateClient } from "@/trpc/server";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The blog",
  description: "Read, Think, Write.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body>
        <TRPCReactProvider>
          <AppRouterCacheProvider>
            <ThemeProvider
              theme={theme}
              disableTransitionOnChange
              defaultMode="light"
            >
              <HydrateClient>
                <Navbar />
                {children}
                <Toaster />
              </HydrateClient>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
