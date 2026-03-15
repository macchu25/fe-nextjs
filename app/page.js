"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[500px] text-center space-y-6">
        
        <h1 className="text-3xl font-bold text-gray-800">
          🎓 School Management
        </h1>

        <p className="text-gray-500">
          Chọn trang bạn muốn quản lý
        </p>

        <div className="grid grid-cols-1 gap-4 mt-6">

          <Link
            href="/teacher"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg transition"
          >
            Manage Teachers
          </Link>

          <Link
            href="/class"
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition"
          >
             Manage Classes
          </Link>

          <Link
            href="/student"
            className="bg-green-400 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition"
          >
             Manage Students
          </Link>

        </div>

      </div>

    </div>
  )
}