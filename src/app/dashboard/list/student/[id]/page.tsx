'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Table from "@/components/Table";
import Pagination from "@/components/pagination";

interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface ParentInfo {
  _id: string;
  email: string;
  whatsapp?: string;
  address?: Address;
}

interface PaymentHistory {
  amount: number;
  currency: string;
  transactionId: string;
  paymentMethod: string;
  paidAt: string;
  planStartDate: string;
  planEndDate: string;
}

interface StudentDetails {
  _id: string;
  name: string;
  surname: string;
  email: string;
  profileImage: string;
  sex: string;
  birthday: string;
  tamilGrade?: string;
  parent: ParentInfo | string;
  paymentHistory: PaymentHistory[];
}

const paymentColumns = [
  { header: "Amount", accessor: "amount", className: "" },
  { header: "Currency", accessor: "currency", className: 'hidden lg:table-cell' },
  { header: "Transaction ID", accessor: "transactionId", className: 'hidden md:table-cell' },
  { header: "Paid At", accessor: "paidAt", className: 'hidden md:table-cell' },
  { header: "Plan Start", accessor: "planStartDate", className: "" },
  { header: "Plan End", accessor: "planEndDate", className: "" },
];

const StudentDetailsPage = () => {
  const { id } = useParams();
  const { data: session } = useSession();

  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Pagination 🔽
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    if (!id) return;
    fetchStudentDetails();
  }, [id]);

  const fetchStudentDetails = async () => {
    try {
      const res = await fetch(`/api/student/${id}`);
      const data = await res.json();
      setStudent(data);
    } catch (err) {
      console.error("Student fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (!student) return <p className="text-center text-red-500 p-4">Student Not Found</p>;

  const paymentData = student.paymentHistory || [];
  const totalPages = Math.ceil(paymentData.length / rowsPerPage);
  const paginatedPaymentData = paymentData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

 const renderPaymentRow = (row: PaymentHistory) => (
  <tr key={row.transactionId} className="text-left text-gray-700 text-md even:bg-slate-50 hover:bg-purple-100">
    <td className="py-3">{row.amount}</td>
    <td className="py-3 hidden lg:table-cell">{row.currency}</td>
    <td className="py-3 hidden md:table-cell text-sm">{row.transactionId}</td>
    <td className="py-3 hidden md:table-cell">{new Date(row.paidAt).toLocaleString()}</td>
    <td className="py-3">{new Date(row.planStartDate).toLocaleDateString()}</td>
    <td className="py-3">{new Date(row.planEndDate).toLocaleDateString()}</td>
  </tr>
);

  const parent = typeof student.parent === "object" ? student.parent : null;

  return (
    <div className="bg-white rounded-md flex-1 m-4 mt-0 p-4 shadow-sm">
     <div className="flex justify-between mb-4">
      <h1 className="text-2xl font-bold mb-6">Student Profile</h1>
        <button onClick={() => window.history.back()}
           className="mr-4 bg-primary hover:bg-transparent border border-primary text-lg hover:text-primary text-white transition py-1 px-5 rounded-md" >
            Back
        </button>
     </div>
      {/* === Student Details Card === */}
      <div className="flex flex-col md:flex-row gap-6 mb-10 p-6 bg-purple-50 rounded-lg shadow-sm">
        <Image
          src={student.profileImage || "/noimage.png"}
          width={100}
          height={100}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border"
        />

        <div className="space-y-2">
          <p><strong>Name:</strong> {student.name} {student.surname}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Tamil Grade:</strong> {student.tamilGrade || "Not Assigned"}</p>
          <p><strong>Gender:</strong> {student.sex}</p>
          <p><strong>DOB:</strong> {new Date(student.birthday).toLocaleDateString()}</p>

          {parent && (
            <>
              <p><strong>Parent Email:</strong> {parent.email}</p>
              <p><strong>Parent WhatsApp:</strong> {parent.whatsapp || "N/A"}</p>

              {parent.address && (
                <p>
                  <strong>Address:</strong> {parent.address.street}, {parent.address.city},{" "}
                  {parent.address.state} - {parent.address.postalCode},{" "}
                  {parent.address.country}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* === PAYMENT TABLE === */}
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>

      {paymentData.length > 0 ? (
        <>
          <Table
            columns={paymentColumns}
            data={paginatedPaymentData}
            renderRow={renderPaymentRow}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        <p className="text-gray-500">No payment records found.</p>
      )}
    </div>
  );
};

export default StudentDetailsPage;