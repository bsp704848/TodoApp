'use client'

import Link from "next/link";
import { useRouter} from "next/navigation";
import { useState } from "react";
import BG from '../../../../public/loginbg.png'
import { CheckCircle, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/app/redux/authSlice'; 


export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(loginUser({ name: form.email.split('@')[0], email: form.email })); 
    
    setMessage({ text: data.message, type: "success" });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      setTimeout(() => {
        router.push("/todo/todolist");
      }, 1500); 
    } else {
    setMessage({ text: "Check email and password", type: "error" });
     setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
};


  return (
    <div className="flex min-h-screen relative flex-col lg:flex-row">

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
      
      <div
        className="w-full lg:w-1/2 bg-cover text-white flex items-center justify-center"
        style={{ backgroundImage: `url(${BG.src})` }}>
      </div>

      <div className="w-full lg:w-1/2  flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg ">
      <h2 className= "text-3xl font-extrabold text-center mb-6">Welcome Back!</h2>

          <input
          type="email"
           className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 "
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
           
          <div className="relative mb-4">
          <input
          type={showPassword ? "text" : "password"}
           className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 "
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
            
            <button
              type="button"
              className="absolute right-6 top-1/3 transform -translate-y-1/2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)} 
            >
              {showPassword ? (
                <Eye size={20} /> 
              ) : (
                <EyeOff size={20} /> 
              )}
            </button>
          </div>

          <p className="text-center text-sm">
            New User ? Create an acount first 
            <Link  href={'/auth/register'} className="text-blue-600 font-bold"> Register </Link></p>
          
          <button
          type="submit"
         className="mt-6 w-full py-2 text-white font-bold rounded-2xl bg-indigo-500 hover:bg-indigo-600"
        >
            Login
          </button>
         
      
        </form>
        </div>
      </div>
  );
}
