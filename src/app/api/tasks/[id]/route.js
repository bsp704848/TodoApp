import { connectDB } from "@/app/lib/mongodb"; 
import { Task } from "@/app/models/Task";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
} 


export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;


    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
} 

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
