"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface MenuProps {
  closeSideMenu?: () => void;
  isSideMenuOpen?: boolean;
}

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: "/home.png", label: "Home", href: "/dashboard", visible: ["admin"] },
      { icon: "/home.png", label: "Home", href: "/dashboard/parent", visible: ["parent"] },
      { icon: "/home.png", label: "Home", href: "/dashboard/teacher", visible: ["teacher"] },
      { icon: "/subject.png", label: "Subscription", href: "/dashboard/list/subscription", visible: ["admin"] },
      { icon: "/teacher.png", label: "Teachers", href: "/dashboard/list/teachers", visible: ["admin", "teacher"] },
      { icon: "/student.png", label: "Students", href: "/dashboard/list/student", visible: ["admin", "teacher"] },
      { icon: "/student.png", label: "Children", href: "/dashboard/list/children", visible: ["parent"] },
      { icon: "/parent.png", label: "Parents", href: "/dashboard/list/parents", visible: ["admin", "teacher"] },
      { icon: "/subscription.jpg", label: "Subscription", href: "/dashboard/list/subscriptionPlans", visible: ["parent"] },
      { icon: "/payment.png", label: "Payment", href: "/dashboard/list/paymentDetails", visible: ["parent"] },
      { icon: "/assignment.png", label: "Assign Grade", href: "/dashboard/list/assignGradeTeacher", visible: ["admin"] },
      { icon: "/invoice.png", label: "Generate Bill", href: "/dashboard/list/generateBill", visible: ["admin"] },
      { icon: "/class.png", label: "Classes", href: "/dashboard/list/classes", visible: ["admin", "teacher"] },
      { icon: "/subject.png", label: "Subjects", href: "/dashboard/list/subjects", visible: ["admin"] },
      { icon: "/paymenticon.png", label: "Invoice Bill", href: "/dashboard/list/invoiceBill", visible: ["parent"] },
      { icon: "/feedback.png", label: "Feedback", href: "/dashboard/list/parentFeedback", visible: ["parent"] },
      { icon: "/announcement.png", label: "Announcements", href: "/dashboard/list/announcement", visible: ["admin", "teacher"] },
      { icon: "/trial.png", label: "Free Trial", href: "/dashboard/list/freeTrial", visible: ["admin"] },
      { icon: "/message.png", label: "Message", href: "/dashboard/list/contactMessage", visible: ["admin"] },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: "/profile.png", label: "Profile", href: "/dashboard/parentProfile", visible: ["parent"] },
    ],
  },
];

export default function Menu({ closeSideMenu, isSideMenuOpen }: MenuProps) {
  const { data: session } = useSession();
  const role = session?.user?.role?.toLowerCase() || "admin";

  const dimmedIcons = [
    "/image.png",
    "/feedback.png",
    "/trial.png",
    "/paymenticon.png",
    "/subscription.jpg",
    "/payment.png",
    "/invoice.png",
  ];

  return (
    <div
      className={`mt-4 text-md overflow-y-auto h-[calc(100%-2rem)] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}
    >
      {menuItems
        .filter((section) => section.title !== "OTHER" || role === "parent")
        .map((section) => (
          <div className="flex flex-col gap-2" key={section.title}>
            {/* Always show section title when sidebar is open or on large screens */}
            <span
              className={`text-gray-400 font-light my-4 ${
                isSideMenuOpen ? "block" : "hidden md:block"
              }`}
            >
              {section.title}
            </span>

            {section.items.map((item) => {
              if (item.visible.includes(role)) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeSideMenu}
                    className="flex items-center justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={20}
                      height={20}
                      className={dimmedIcons.includes(item.icon) ? "opacity-90" : ""}
                    />
                    {/* Always show label when sidebar is open or on large screens */}
                    <span className={`${isSideMenuOpen ? "block" : "hidden md:block"}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              }
            })}
          </div>
        ))}
    </div>
  );
}