import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Student from "@/models/studentModel";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const teacherId = req.nextUrl.searchParams.get("teacherId");
    if (!teacherId) {
      return NextResponse.json(
        { message: "Teacher ID is required" },
        { status: 400 }
      );
    }

    // Fetch all students linked to this teacher
    const students = await Student.find({ teacher: teacherId })
      .populate("grade", "name")
      .populate("parent", "motherFirstName fatherFirstName email")
      .lean();

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error("Error fetching students by teacher:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}