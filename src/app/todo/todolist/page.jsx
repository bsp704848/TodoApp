'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";

export default function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar/>
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">All Tasks</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">{task.title}</h2>
            <p className="text-gray-600"> {task.description ? task.description.slice(0, 50) + "..." : "No description available"}</p>
            <p className="text-sm text-gray-400 mt-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <Link href={`/todo/viewtask/${task._id}`}>
              <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full">
                View Task
              </button>
            </Link>
          </div>
        ))}
      </div>
      </div>
      <Footer/>
      </>
  );
}
