import Link from 'next/link';
import React from 'react';


const Footer = () => {
  return (
    <div>
      <footer className="bg-black mt-24 shadow-inner">
  <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-center items-center gap-6">
    
 
    <div className="flex space-x-8" style={{fontFamily:'serif'}}>
      <Link href="/" className="text-white hover:text-indigo-600 font-medium transition-colors">
        Home
      </Link>
      <Link href="/todo/about" className="text-white hover:text-indigo-600 font-medium transition-colors">
        About
      </Link>
      <Link href="/todo/contact" className="text-white hover:text-indigo-600 font-medium transition-colors">
        Contact
      </Link>
    </div>

    <p className="text-white text-sm text-center md:text-right"  style={{fontFamily:'serif'}}>
      &copy; {new Date().getFullYear()} Task Tracker. All rights reserved.
    </p>

  </div>
</footer>

    </div>
  )
}

export default Footer
