"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { FiMenu } from "react-icons/fi";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  return (
    <div className="h-screen flex">
      {/* LEFT SIDEBAR */}
      <div
        className={`fixed md:relative z-50 bg-white p-4 transition-transform duration-300
        w-[70%] sm:w-[50%] md:w-[8%] lg:w-[12%] xl:w-[14%] h-full 
        flex flex-col 
        ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-end md:hidden mb-4">
          <button onClick={() => setSideMenuOpen(false)} className="text-2xl">
            ✕
          </button>
        </div>

        {/* LOGO */}
        {!isSideMenuOpen && (
          <Link
            href=""
            className="flex items-center justify-center lg:justify-start gap-2 mb-4"
          >
            <Image src="/utalogo.jpg" alt="logo" width={220} height={70} />
          </Link>
        )}

        {/* SCROLLABLE MENU */}
        <Menu
          closeSideMenu={() => setSideMenuOpen(false)}
          isSideMenuOpen={isSideMenuOpen}
        />
      </div>

      {/* OVERLAY for mobile */}
      {isSideMenuOpen && (
        <div
          onClick={() => setSideMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* RIGHT MAIN CONTENT */}
      <div className="flex flex-col w-full md:w-[92%] lg:w-[88%] xl:w-[86%] bg-[#F7F8FA] min-h-screen">
        {/* Navbar + Menu Toggle */}
        <div className="flex items-center justify-between bg-white shadow-sm px-4 py-3 md:hidden">
          <button onClick={() => setSideMenuOpen(true)}>
            <FiMenu className="text-3xl" />
          </button>
          <Image src="/utalogo.jpg" alt="logo" width={120} height={50} />
        </div>

        <Navbar />
        <div className="flex-1 overflow-y-auto">{children}</div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
}