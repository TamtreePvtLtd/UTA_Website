import type { Metadata } from "next";
import { Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import "@/lib/cronJobs";
import { NextIntlClientProvider } from "next-intl";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.universaltamilacademy.com"),
  title: "Universal Tamil Academy | Learn Tamil Online",
  icons: {
    icon: "/utalogo.jpg",
  },
  description:
    "Universal Tamil Academy provides online Tamil classes for kids, adults, and beginners. Live Tamil speaking, reading & writing courses. Try a free Tamil class!",
  keywords: [
    "Tamil online classes",
    "Learn Tamil online",
    "Tamil for kids",
    "Tamil language course",
    "Tamil speaking classes",
    "Tamil academy",
    "Online Tamil school",
    "Tamil classes for adults",
    "Tamil learning for beginners",
    "Tamil tutoring online",
  ],
  authors: [{ name: "Universal Tamil Academy" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://www.universaltamilacademy.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.universaltamilacademy.com",
    title: "Universal Tamil Academy | Learn Tamil Online",
    description:
      "Join Universal Tamil Academy to learn Tamil through live interactive classes. Courses for kids, beginners, and adults. Take your Tamil speaking to the next level!",
    siteName: "Universal Tamil Academy",
    images: [
      {
        url: "/utalogo.jpg",
        width: 1200,
        height: 630,
        alt: "Universal Tamil Academy Logo",
      },
    ],
  },
};

// Move viewport OUTSIDE metadata
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={`${roboto.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider session={session}>{children}</AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}