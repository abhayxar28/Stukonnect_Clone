"use client";

import { useRouter } from "next/navigation"

export default function ButtonComponent(){
    const router = useRouter();
    return (
        <button type="button" onClick={()=>{router.push('/mentor')}} className="text-white font-bold bg-[#ed7234] hover:bg-[#101826] focus:outline-none rounded-lg text-lg px-10 py-4 text-center me-2 mb-2 cursor-pointer transition-300">Find your Mentor 🚀</button>
    )
}