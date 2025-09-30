import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Parent from '@/models/parent';
import bcrypt from 'bcryptjs';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export async function POST(req: Request) {
  try {
    const { email, whatsapp, password, role, country, countryCode, countryIso } = await req.json();
    
    if (!email || !whatsapp || !password || !role || !country || !countryCode) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }
    
    // Phone validation with libphonenumber-js
    const phoneNumber = parsePhoneNumberFromString(whatsapp, country);
    if (!phoneNumber || !phoneNumber.isValid()) {
      return NextResponse.json({ message: "Invalid phone number for selected country" }, { status: 400 });
    }
    const formattedPhone = phoneNumber.formatInternational();
    const normalFormat = phoneNumber.number; 
    
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          message: "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"
        },
        { status: 400 }
      );
    }
    await connectMongoDB();

    const existing = await Parent.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Parent already exists" }, { status: 409 });
    }

    // Save parent
    const hashedPassword = await bcrypt.hash(password, 10);
    const newParent = new Parent({
      email,
      whatsapp: normalFormat,      
      whatsappDisplay: formattedPhone,
      password: hashedPassword,
      role,
      address: { country, countryCode },
      paymentStatus: 'pending',
    });

    await newParent.save();

    return NextResponse.json({ message: "Parent registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}