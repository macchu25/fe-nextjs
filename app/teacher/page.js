"use client"

import { useRef } from "react"
import TeacherForm from "../component/TeacherForm"
import TeacherList from "../component/TeacherList"

export default function TeacherPage() {
  const listRef = useRef()

  return (
    <div className="p-10 space-y-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black text-center">Teacher</h1>

      <TeacherForm reload={() => listRef.current?.reload()} />
      <TeacherList ref={listRef} />
    </div>
  )
}


