'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertTriangle } from 'lucide-react';
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const router = useRouter();
   const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, dueDate }),
    });

    if (res.ok) {
      router.push("/todo/todolist"); 
    } else {
      setMessage({ text: "Something went wrong!",type:"error" });
       setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return (
    <>
      <Navbar/>
    <div className="min-h-screen flex items-center justify-center p-8 relative ">
      {message.text && (
            <div
              className={`absolute top-4 right-4 p-4 text-white font-bold rounded-lg ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
            >
             <div className="flex items-center">
      
            {message.type === 'success' && <CheckCircle className="mr-2" />}
            
            {message.type === 'error' && <AlertTriangle className="mr-2" />}
            
            <p>{message.text}</p>
          </div>
            </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create New Task</h1>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          rows={4}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
        >
          Create Task
        </button>
      </form>
      </div>
      <Footer/>
      </>
  );
}
