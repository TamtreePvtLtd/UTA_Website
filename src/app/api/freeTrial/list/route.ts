import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import FreeTrial from '@/models/freeTrialModel';
import Student from '@/models/studentModel';
import Class from '@/models/classModel';
import Parent from '@/models/parent'; 

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const freeTrials = await FreeTrial.find()
      .populate({
        path: 'studentId',
        model: Student,
        populate: {
          path: 'grade',
          model: Class,
        },
      })
      .populate({
        path: 'parentId',
        model: Parent, 
      })
      .lean();

    const mapped = freeTrials.map((t: any) => ({
      _id: t._id,
      parentEmail: t.parentId?.email || '', 
      student: {
        _id: t.studentId?._id,
        name: t.studentId?.name,
        surname: t.studentId?.surname,
        grade: {
          _id: t.studentId?.grade?._id,
          name: t.studentId?.grade?.name,
        },
      },
      bookedAt: t.bookedAt,
    }));

    return NextResponse.json({ freeTrials: mapped });
  } catch (error) {
    console.error('Fetch FreeTrial error:', error);
    return NextResponse.json({ error: 'Failed to fetch Free Trials' }, { status: 500 });
  }
}