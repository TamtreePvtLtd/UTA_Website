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
  viewport: "width=device-width, initial-scale=1.0",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://universaltamilacademy.com",
  },
  openGraph: {
    type: "website",
    url: "https://universaltamilacademy.com",
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

export default async function RootLayout({
  children,
}:  Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={`${roboto.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">
        {/* <NextIntlClientProvider> */}
          <AuthProvider session={session}>{children}</AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
