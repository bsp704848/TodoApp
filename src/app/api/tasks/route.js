import { connectDB } from "@/app/lib/mongodb"; 
import { Task } from "@/app/models/Task";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find({});
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
} 


export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, description, dueDate } = body;

    const newTask = await Task.create({
      title,
      description,
      dueDate,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
