import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import Teacher from "@/models/teacherModel";
import cloudinary from "@/lib/cloudinary";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import os from "os";

function getCloudinaryPublicId(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?([^?#]+)\.\w+$/);
    return match ? match[1] : null;
  } catch (error) {
    console.error("Error extracting Cloudinary public_id:", error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const formData = await req.formData();
    const rest = Object.fromEntries(formData.entries());

    const profileFile = formData.get("profileImage") as File | null;
    const resumeFile = formData.get("resume") as File | null;

    const password = rest.password?.toString();
    if (!password) {
      return NextResponse.json({ msg: "Password is required" }, { status: 400 });
    }
    delete rest.password;

    let imageUrl = "";
    if (profileFile && profileFile.name) {
      const bytes = Buffer.from(await profileFile.arrayBuffer());
      const tempPath = path.join(os.tmpdir(), profileFile.name);
      await writeFile(tempPath, bytes);
      const result = await cloudinary.uploader.upload(tempPath, {
        folder: "teacher_profiles",
      });
      imageUrl = result.secure_url;
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }

    let resumeUrl = "";
    if (resumeFile && resumeFile.name) {
      const bytes = Buffer.from(await resumeFile.arrayBuffer());
      const tempPath = path.join(os.tmpdir(), resumeFile.name);
      await writeFile(tempPath, bytes);
      const result = await cloudinary.uploader.upload(tempPath, {
        folder: "teacher_resumes",
        resource_type: "raw", 
      });
      resumeUrl = result.secure_url;
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdTeacher = await Teacher.create({
      ...rest,
      password: hashedPassword,
      profileImage: imageUrl,
      resume: resumeUrl, 
      role: "Teacher",
    });

    const populated = await Teacher.findById(createdTeacher._id).select("-password");
    return NextResponse.json(
      { msg: "Teacher created", teacher: populated },
      { status: 201 }
    );
  } catch (err) {
    console.error("Create Teacher Error:", err);
    return NextResponse.json({ msg: "Creation failed", error: err }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ msg: "Teacher ID missing" }, { status: 400 });

    const formData = await req.formData();
    const profileFile = formData.get("profileImage") as File | null;
    const resumeFile = formData.get("resume") as File | null;
    const removeImage = formData.get("removeImage") === "true";
    const removeResume = formData.get("removeResume") === "true";
    const rest = Object.fromEntries(formData.entries());

    const teacher = await Teacher.findById(id);
    if (!teacher) return NextResponse.json({ msg: "Teacher not found" }, { status: 404 });

    let imageUrl = teacher.profileImage;
    if (profileFile && profileFile.name) {
      if (imageUrl) {
        const publicId = getCloudinaryPublicId(imageUrl);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
      const bytes = Buffer.from(await profileFile.arrayBuffer());
      const tempPath = path.join(os.tmpdir(), profileFile.name);
      await writeFile(tempPath, bytes);
      const result = await cloudinary.uploader.upload(tempPath, {
        folder: "teacher_profiles",
      });
      imageUrl = result.secure_url;
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    } else if (removeImage && imageUrl) {
      const publicId = getCloudinaryPublicId(imageUrl);
      if (publicId) await cloudinary.uploader.destroy(publicId);
      imageUrl = "";
    }

    let resumeUrl = teacher.resume;
    if (resumeFile && resumeFile.name) {
      // Always delete old resume before uploading new
      if (resumeUrl) {
        const publicId = getCloudinaryPublicId(resumeUrl);
        if (publicId) {
          console.log("Deleting old resume:", publicId);
          await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
        }
      }

      const bytes = Buffer.from(await resumeFile.arrayBuffer());
      const tempPath = path.join(os.tmpdir(), resumeFile.name);
      await writeFile(tempPath, bytes);
      const uploadResult = await cloudinary.uploader.upload(tempPath, {
        folder: "teacher_resumes",
        resource_type: "raw",
      });
      resumeUrl = uploadResult.secure_url;
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    } else if (removeResume && resumeUrl) {
      const publicId = getCloudinaryPublicId(resumeUrl);
      if (publicId)
        await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
      resumeUrl = "";
    }

    const password = rest.password?.toString();
    if (password && password.trim() !== "") {
      rest.password = await bcrypt.hash(password, 10);
    } else {
      delete rest.password;
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { ...rest, profileImage: imageUrl, resume: resumeUrl },
      { new: true }
    ).select("-password");

    return NextResponse.json(
      { msg: "Teacher updated successfully", teacher: updatedTeacher },
      { status: 200 }
    );
  } catch (err) {
    console.error("Update Teacher Error:", err);
    return NextResponse.json({ msg: "Update failed", error: err }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const teachers = await Teacher.find().select("-password");
    return NextResponse.json({ teachers }, { status: 200 });
  } catch (err) {
    console.error("Get Teachers Error:", err);
    return NextResponse.json({ msg: "Fetch failed", error: err }, { status: 500 });
  }
}