"use client"

import { useRef } from "react"
import ClassForm from "../component/ClassForm"
import ClassList from "../component/ClassList"

export default function ClassPage() {
  const listRef = useRef()

  return (
    <div className="p-10 space-y-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black">Class</h1>

      <ClassForm reload={() => listRef.current?.reload()} />
      <ClassList ref={listRef} />
    </div>
  )
}

