import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import PWAProvider from "@/components/PWAProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santos.travel - Explore the World with Us",
  description: "Discover amazing travel destinations and book your dream vacation with Santos.travel. We offer tour packages to India, Europe, Asia, and worldwide destinations.",
  keywords: "travel, tours, vacation, holidays, travel packages, India tours, Europe tours, Asia tours, Santos.travel",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Santos Travel",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Santos Travel",
    title: "Santos.travel - Explore the World with Us",
    description: "Discover amazing travel destinations and book your dream vacation with Santos.travel.",
  },
  twitter: {
    card: "summary",
    title: "Santos.travel - Explore the World with Us",
    description: "Discover amazing travel destinations and book your dream vacation with Santos.travel.",
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#f59e0b',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Santos Travel" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/santos-logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/santos-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/santos-logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/santos-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/santos-logo.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/santos-logo.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/santos-logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}
      >
        <PWAProvider />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
