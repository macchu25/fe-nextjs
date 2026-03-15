"use client"

import { useEffect, useState } from "react"
import { createClass, getTeachers } from "../lib/api"

export default function ClassForm({ reload }) {
  const [name, setName] = useState("")
  const [teacherId, setTeacherId] = useState("")
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    async function loadTeachers() {
      const data = await getTeachers()
      setTeachers(data)
    }

    loadTeachers()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    await createClass({
      name,
      teacher_id: Number(teacherId),
    })

    setName("")
    setTeacherId("")
    reload()
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">Thêm lớp học</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Tên lớp</label>
          <input
            placeholder="Nhập tên lớp"
            value={name}
            onChange={e => setName(e.target.value)}
            className="text-black w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Giáo viên phụ trách</label>
          <select
            value={teacherId}
            onChange={e => setTeacherId(e.target.value)}
            className="text-black w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Chọn giáo viên</option>
            {teachers.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
          Add Class
        </button>
      </form>
    </section>
  )
}