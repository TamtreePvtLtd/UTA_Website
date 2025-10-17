'use client';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";

interface Announcement {
  _id: string;
  title: string;
  description: string;
  date: string;
  class?: { name: string };
}

interface Teacher {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  additionalPhone?: string;
  address?: string;
  profileImage?: string;
  bloodType?: string;
  sex?: string;
  birthday?: string;
}

const TeacherDashboardPage = () => {
  const { data: session } = useSession();
  const teacherId = session?.user?.id; 
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!teacherId) return;
      try {
        // Fetch teacher details
        const teacherRes = await fetch(`/api/teacher/${teacherId}`);
        const teacherData = await teacherRes.json();
        setTeacher(teacherData.teacher || []);

        // Fetch announcements
        const announcementsRes = await fetch("/api/announcement");
        const announcementsData = await announcementsRes.json();
        setAnnouncements(announcementsData.data || []);
      } catch (err) {
        console.error("Error loading teacher dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [teacherId]);

  if (loading)
    return <div className="p-6 text-lg text-gray-600">Loading dashboard...</div>;
  if (!teacher)
    return <div className="p-6 text-lg text-red-500">No teacher data found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section className="bg-gradient-to-r from-amber-100 to-amber-100 text-black py-8 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Teacher Dashboard</h1>
      </section>

      {/* Announcements Section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
         {announcements.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-secondary">📢 Announcements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {announcements.map((a) => (
                    <div key={a._id} className="border-l-4 border-blue-400 bg-white p-4 rounded shadow">
                      <h3 className="text-lg font-semibold text-primary">{a.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" /> {new Date(a.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">{a.description}</p>
                        <p className="text-sm text-gray-400">Class: {a.class?.name}</p>
                    </div>
                  ))}
                </div>
            </div>
          )}
      </div>
      {/* Teacher Info */}
      <div className="max-w-4xl mx-auto my-8 px-6 py-8 bg-white shadow-md rounded-2xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={teacher.profileImage || "/tree.webp"}
            alt="Teacher Profile"
            className="w-32 h-32 rounded-full object-cover border-1 border-gray"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-primary">
              {teacher.name} {teacher.surname}
            </h2>
            <p className="text-gray-600">{teacher.email}</p>
            <p className="text-gray-600">📞 {teacher.phone}</p>
            {teacher.additionalPhone && (
              <p className="text-gray-600">📞 {teacher.additionalPhone}</p>
            )}
            <p className="text-gray-600">🏠 {teacher.address}</p>
            <p className="text-gray-600">
              💉 Blood Type: <span className="font-medium">{teacher.bloodType}</span>
            </p>
            <p className="text-gray-600">
              🎂 Birthday:{" "}
              {teacher.birthday
                ? new Date(teacher.birthday).toLocaleDateString()
                : "N/A"}
            </p>
            
          </div>
        </div>
      </div>

    </div>
  );
};

export default TeacherDashboardPage;