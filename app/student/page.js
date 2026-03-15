"use client"

import { useRef } from "react"

import StudentForm from "../component/StudentForm"
import StudentList from "../component/StudentList"

export default function ClassPage() {
  const listRef = useRef()

  return (
    <div className="p-10 space-y-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black">Class</h1>

  <StudentForm reload={() => listRef.current?.reload()} />
      <StudentList reload={() => listRef.current?.reload()} />

    
    </div>
  )
}