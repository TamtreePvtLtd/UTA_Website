import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Parent from "@/models/parent";
import Student from "@/models/studentModel";
import cloudinary from '@/lib/cloudinary';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';
import fs from 'fs';

function getCloudinaryPublicId(url: string): string | null {
  try {
    const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error parsing Cloudinary URL:', error);
    return null;
  }
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id)
    return NextResponse.json({ error: 'Missing parent ID' }, { status: 400 });

  try {
    await connectMongoDB();
    const formData = await req.formData();
    const file = formData.get('profileImage') as File | null;

    const existingParent = await Parent.findById(id);
    if (!existingParent)
      return NextResponse.json({ error: 'Parent not found' }, { status: 404 });

    const updates: any = {};
    const address: any = {};

    // Collect form data
    for (const [key, value] of formData.entries()) {
      if (key === 'profileImage') continue;

      if (key.startsWith('address[')) {
        const addrKey = key.match(/address\[(.*?)\]/)?.[1];
        if (addrKey) address[addrKey] = value.toString();
      } else if (key.startsWith('address.')) {
        const addrKey = key.split('.')[1];
        address[addrKey] = value.toString();
      } else {
        updates[key] = value.toString();
      }
    }

    if (Object.keys(address).length > 0) {
      updates.address = existingParent.address
        ? { ...existingParent.address.toObject(), ...address }
        : address;
    }

    // Handle new profile image upload
    if (file && file.name && file.size > 0) {
      // Delete old Cloudinary image if it exists
      if (existingParent.profileImage) {
        const publicId = getCloudinaryPublicId(existingParent.profileImage);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
            console.log('Deleted old Cloudinary image:', publicId);
          } catch (err) {
            console.error('Error deleting old Cloudinary image:', err);
          }
        }
      }

      // Upload new image
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const tempPath = path.join(os.tmpdir(), file.name);
      await writeFile(tempPath, buffer);

      try {
        const result = await cloudinary.uploader.upload(tempPath, {
          folder: 'parent_profiles',
        });
        updates.profileImage = result.secure_url;
      } catch (err) {
        console.error('Error uploading new image:', err);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      } finally {
        try {
          fs.unlinkSync(tempPath);
        } catch (err) {
          console.error('Error deleting temp file:', err);
        }
      }
    }

    const updatedParent = await Parent.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updatedParent);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      {
        error: 'Failed to update parent',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const parents = await Parent.find().lean();
    const allStudentIds = parents.flatMap((p) => p.students);
    const students = await Student.find({ _id: { $in: allStudentIds } }).lean();
    return NextResponse.json({ parents, students });
  } catch (error) {
    console.error('Error fetching parents and students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id)
    return NextResponse.json({ error: 'Missing parent ID' }, { status: 400 });

  try {
    await connectMongoDB();
    const deletedParent = await Parent.findByIdAndDelete(id);
    if (!deletedParent)
      return NextResponse.json({ error: 'Parent not found' }, { status: 404 });

    // Delete associated students
    await Student.deleteMany({ parent: id });

    // Delete parent image from Cloudinary
    if (deletedParent.profileImage) {
      const publicId = getCloudinaryPublicId(deletedParent.profileImage);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
          console.log('Deleted Cloudinary image:', publicId);
        } catch (err) {
          console.error('Error deleting parent Cloudinary image:', err);
        }
      }
    }

    return NextResponse.json({
      message: 'Parent and associated students deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete parent and students' },
      { status: 500 }
    );
  }
}