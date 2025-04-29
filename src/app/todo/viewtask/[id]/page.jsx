'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trash, Edit, CheckCircle, AlertTriangle} from 'lucide-react';

export default function ViewTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
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

  const handleDelete = async () => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setMessage({ text: "Task deleted successfully", type:"success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
       setTimeout(() => {
         router.push("/todo/todolist"); 
      }, 1500); 
    
    } else {
      setMessage({ text: "Error deleting task",type:"error" });
       setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };
    const handleEdit = () => {
    router.push(`/todo/edittask/${id}`); 
  };

  if (!task) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100 relative">
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">{task.title}</h1>
        <p className="text-gray-700 mb-6">{task.description}</p>
        <p className="text-gray-500 mb-2">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
        <p className="text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full"
          >
            <Edit className="w-5 h-5" />
            <span>Edit Task</span>
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
          >
            <Trash className="w-5 h-5" />
            <span>Delete Task</span>
          </button>
        </div>
        
      </div>
    </div>
  );
}
