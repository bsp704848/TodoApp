import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    console.log("Login Attempt:", { email, password });

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

 
    if (user.password !== password) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }


    return NextResponse.json({ message: "Login successful!" }, { status: 200 });

  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
