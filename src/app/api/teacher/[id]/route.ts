import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Teacher from "@/models/teacherModel";
import "@/models/subjectModel";
import cloudinary from "@/lib/cloudinary";

function getCloudinaryPublicId(url: string): string | null {
  try {
    const match = url.match(/\/(?:image|raw)\/upload\/v\d+\/([^\.]+)\.\w+$/);
    return match ? match[1] : null;
  } catch (err) {
    console.error("Error extracting public ID:", err);
    return null;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectMongoDB();
    const teacher = await Teacher.findById(id)
      .select("-password")
      .populate("subjects", "name");

    if (!teacher) {
      return NextResponse.json({ msg: "Teacher not found" }, { status: 404 });
    }

    return NextResponse.json({ teacher }, { status: 200 });
  } catch (err) {
    console.error("Error fetching teacher:", err);
    return NextResponse.json(
      { msg: "Failed to get teacher", error: err },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectMongoDB();
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return NextResponse.json({ msg: "Teacher not found" }, { status: 404 });
    }

    // === Delete profile image ===
    if (teacher.profileImage) {
      const imagePublicId = getCloudinaryPublicId(teacher.profileImage);
      if (imagePublicId) {
        try {
          await cloudinary.uploader.destroy(imagePublicId, { resource_type: "image" });
          console.log("Profile image deleted:", imagePublicId);
        } catch (err) {
          console.error("Error deleting profile image:", err);
        }
      }
    }

    // === Delete resume (raw) ===
    if (teacher.resume) {
      const resumePublicId = getCloudinaryPublicId(teacher.resume);
      console.log("🧾 Extracted resume ID:", resumePublicId);
      if (resumePublicId) {
        try {
          await cloudinary.uploader.destroy(resumePublicId, { resource_type: "raw" });
          console.log("Resume deleted:", resumePublicId);
        } catch (err) {
          console.error("Error deleting resume:", err);
        }
      } else {
        console.error("Could not extract resume public ID from:", teacher.resume);
      }
    }

    // === Delete MongoDB record ===
    await Teacher.findByIdAndDelete(id);

    return NextResponse.json(
      { msg: "Teacher and Cloudinary files deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting teacher:", err);
    return NextResponse.json(
      { msg: "Delete failed", error: err },
      { status: 500 }
    );
  }
}