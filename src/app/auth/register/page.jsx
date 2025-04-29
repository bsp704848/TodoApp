'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BG from '../../../../public/registerbg.svg'
import { CheckCircle, AlertTriangle ,Eye, EyeOff } from 'lucide-react'; 

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
   const [showPassword, setShowPassword] = useState(false);
  
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

    if (res.ok) {
      setMessage({ text: data.message, type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
       setTimeout(() => {
        router.push("/auth/login");
       }, 1500); 
      } else {
      setMessage({ text: "Something went wrong",type: "error" });
       setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      }
    } catch (err) {
    console.error("Register Error:", err);
    
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

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-center mb-6">Welcome, User</h2>

          <input
            className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            type="text"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className="relative mb-4">
          <input
            className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            
             <button
              type="button"
              className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-600"
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
            Already have an account? 
            <Link href="/auth/login" className="text-blue-600 font-bold"> Login </Link>
           </p>

          <button
            type="submit"
            className="mt-6 w-full py-2 text-white font-bold rounded-2xl bg-indigo-500 hover:bg-indigo-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
