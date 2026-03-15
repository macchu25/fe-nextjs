"use client"

import { useEffect, useState } from "react"
import { createStudent, getClass } from "../lib/api"

export default function StudentForm({ reload }) {
  const [name, setName] = useState("")
    const [email, setEmail] = useState("")
  const [classId, setClassId] = useState("")
  const [classes, setClasses] = useState([])

  useEffect(() => {
    async function loadClasses() {
      const data = await getClass()
      setClasses(Array.isArray(data) ? data : [])
    }

    loadClasses()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    await createStudent({
      name,
      email,
      class_id: Number(classId),
    })

    setName("")
     setEmail("")
    setClassId("")
    reload()
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">Thêm học sinh</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Tên học sinh
          </label>
          <input
            placeholder="Nhập tên học sinh"
            value={name}
            onChange={e => setName(e.target.value)}
            className="text-black w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
  <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            placeholder="Nhập email học sinh"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="text-black w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Lớp
          </label>
          <select
            value={classId}
            onChange={e => setClassId(e.target.value)}
            className=" text-black w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Chọn lớp</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600">
          Add Student
        </button>
      </form>
    </section>
  )
}
