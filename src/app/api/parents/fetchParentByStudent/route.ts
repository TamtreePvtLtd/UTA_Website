import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Student from '@/models/studentModel';

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const studentIdsParam = req.nextUrl.searchParams.get('studentIds');
    if (!studentIdsParam) {
      return NextResponse.json(
        { message: 'Student IDs are required' },
        { status: 400 }
      );
    }

    const studentIds = studentIdsParam.split(',');

    // Fetch students (only needed fields) and populate parent
    const students = await Student.find({ _id: { $in: studentIds } })
      .select('_id name surname email parent') 
      .populate('parent')
      .lean();

    const uniqueParentsMap = new Map();

    students.forEach((student) => {
      if (student.parent) {
        const parentId = student.parent._id.toString();

        // Keep only selected student fields
        const minimalStudent = {
          _id: student._id,
          name: student.name,
          surname: student.surname,
          email: student.email,
        };

        if (!uniqueParentsMap.has(parentId)) {
          const parentData = { ...student.parent, student: [minimalStudent] };
          uniqueParentsMap.set(parentId, parentData);
        } else {
          uniqueParentsMap.get(parentId).student.push(minimalStudent);
        }
      }
    });

    const parents = Array.from(uniqueParentsMap.values());
    return NextResponse.json(parents, { status: 200 });
  } catch (error) {
    console.error('Error fetching parents by student:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}