"use client"

import Link from 'next/link'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/app/redux/authSlice';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");

  };

  return (
    <div>
       <nav className="flex justify-between items-center p-4 bg-white shadow-2xl ">
        <div className="text-2xl font-bold text-indigo-600">
        <Link href={"/"}> Task Tracker</Link>
        </div>
        
        <ul className="flex gap-6 items-center">
          <li>
            <Link href="/todo/about" className="text-gray-700 hover:text-indigo-600 font-semibold">
              About
            </Link>
          </li>
          <li>
            <Link href="/todo/contact" className="text-gray-700 hover:text-indigo-600 font-semibold">
              Contact
            </Link>
          </li>
          {user ? (
            <li className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full text-xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={() => router.push("/auth/login")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
