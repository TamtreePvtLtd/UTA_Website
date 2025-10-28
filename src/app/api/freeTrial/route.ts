import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Parent from '@/models/parent';
import Student from '@/models/studentModel';
import FreeTrial from '@/models/freeTrialModel';

export async function GET(req: NextRequest) {
  try {
    const studentId = req.nextUrl.searchParams.get('studentId');
    if (!studentId) return NextResponse.json({ error: 'Missing studentId' }, { status: 400 });

    await connectMongoDB();
    const exists = await FreeTrial.exists({ studentId });
    return NextResponse.json({ used: !!exists });

  } catch (error) {
    return NextResponse.json({ error: 'GET failed', details: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { parentId, studentId } = await req.json();
    if (!parentId || !studentId) {
      return NextResponse.json({ error: 'Missing parentId or studentId' }, { status: 400 });
    }

    await connectMongoDB();

    const parent = await Parent.findById(parentId);
    if (!parent) {
      return NextResponse.json({ error: 'Parent not found' }, { status: 404 });
    }

    // Ensure student belongs to this parent
    const match = await Student.exists({ _id: studentId, parent: parent._id });
    if (!match) {
      return NextResponse.json({ error: 'Student mismatch' }, { status: 403 });
    }

    // Check if this student already booked a trial
    const hasUsed = await FreeTrial.exists({ studentId });
    if (hasUsed) {
      return NextResponse.json({ error: 'Student already used free trial' }, { status: 403 });
    }

    const trial = new FreeTrial({ parentId, studentId });
    await trial.save();

    return NextResponse.json({ message: 'Free trial booked!' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'POST failed', details: error }, { status: 500 });
  }
}