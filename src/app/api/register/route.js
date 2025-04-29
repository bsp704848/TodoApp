import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    await connectDB(); 


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error in register API:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
