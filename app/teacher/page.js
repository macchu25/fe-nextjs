"use client"

import { useEffect, useState } from "react"
import TeacherForm from "./component/TeacherForm"
import TeacherList from "./component/TeacherList"
import { getTeachers } from "../lib/api"

export default function Page() {
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    async function load() {
      const data = await getTeachers()
      setTeachers(Array.isArray(data) ? data : [])
    }
    load()
  }, [])

  
  const reload = newTeacher => {
    if (newTeacher) setTeachers(prev => [...prev, newTeacher])
    else getTeachers().then(data => setTeachers(Array.isArray(data) ? data : []))
  }

  return (
    <div className="p-10 space-y-6">
      <TeacherForm reload={reload} />
      <TeacherList teachers={teachers} setTeachers={setTeachers} />
    </div>
  )
}