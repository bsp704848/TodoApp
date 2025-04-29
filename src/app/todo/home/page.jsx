'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Image1 from '../../../../public/firstimage.svg'
import Image2 from '../../../../public/secondimage.svg'
import Image3 from '../../../../public/thirdimage.svg'
import Navbar from "@/app/components/navbar/page";
import TitleBg from "../../../../public/titlebg.svg"
import Footer from "@/app/components/footer/page";


export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{fontFamily:'serif'}}> 
      <Navbar />
            <section className="flex flex-col items-center  justify-center text-center mt-24 px-6">
        <span className="flex"><h1 className="text-6xl font-extrabold text-indigo-700 mb-4">
          Welcome to 
        </h1>
        <h1 className="text-6xl font-extrabold ml-4">Task Tracker</h1></span>
        <p className="text-2xl mb-8">
          Organize your tasks, boost productivity, and simplify your life.
        </p>
        <button 
          onClick={() => router.push("/todo/createtask")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-bold text-lg"
        >
          Get Started
        </button>
         <div className="w-full lg:w-1/2 ml-20">
      <Image 
        src={TitleBg} 
        alt="Task Management" 
        width={500} 
      />
    </div>
       </section>

      <div className="flex flex-col gap-16 mt-10 bg-gray-700">
  <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden"> 
          
          <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center ">
            <span className="flex"> <h3 className="text-6xl font-semibold text-white mb-4">Task</h3>
             <h3 className="text-6xl font-semibold text-yellow-300 ml-4">Management</h3></span>
     
      <p className= "text-white text-2xl">
        Easily manage and track your tasks, set priorities, and stay organized.
      </p>
    </div>
    <div className="w-full lg:w-1/2 ml-20">
      <Image 
        src={Image1} 
        alt="Task Management" 
        width={500} 
      />
    </div>
  </div>


  <div className="flex flex-col lg:flex-row-reverse rounded-lg overflow-hidden">
          
    <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
       <span className="flex"> <h3 className="text-6xl font-semibold text-white mb-4">Set</h3>  <h3 className="text-6xl font-semibold text-yellow-300 ml-4">Priorities</h3></span>
      <p className="text-white text-2xl">
        Assign due dates, set reminders, and prioritize tasks to stay focused.
      </p>
    </div>
    <div className="w-full lg:w-1/2 ml-20">
      <Image 
        src={Image2}
        alt="Set Priorities" 
        width={500} 
      />
    </div>
  </div>


  <div  className="flex flex-col lg:flex-row rounded-lg overflow-hidden">
          
    <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
            <span className="flex"><h3 className="text-6xl font-semibold text-white mb-4">Track </h3><h3 className="text-6xl font-semibold text-yellow-300 ml-4">Progress</h3>
              </span>
      <p className="text-white text-2xl">
        Visualize your task completion progress with charts and updates.
      </p>
    </div>
    <div className="w-full lg:w-1/2">
      <Image 
        src={Image3}
        alt="Track Progress" 
        width={500} 
      />
    </div>
  </div>

</div>

      <Footer/>
    </div>
  );
}
