'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function EditTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });
  const router = useRouter();
   const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`/api/tasks/${id}`);
      const data = await res.json();
      setTask(data);
    };
    if (id) fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage({ text: "Task updated successfully", type:"success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
       setTimeout(() => {
       router.push(`/todo/viewtask/${id}`); 
      }, 1500); 
      
    } else {
      setMessage({ text: "Error updating task",type:"error"});
       setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100 relative ">
     
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

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Edit Task</h2>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          placeholder="Task Title"
        />
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          placeholder="Task Description"
        />
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <button type="submit" className="w-full py-2 bg-indigo-500 text-white rounded-lg">
          Update Task
        </button>
      </form>
    </div>
  );
}
