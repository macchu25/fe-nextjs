"use client"

import { useState } from "react"
import { createTeachers } from "../lib/api"

export default function TeacherForm({ reload }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name || !email || !phone) return alert("Nhập đủ thông tin!")

    await createTeachers({ name, email, phone })

    setName("")
    setEmail("")
    setPhone("")

    reload() // gọi hàm từ component cha để fetch lại danh sách
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">Thêm giáo viên</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Tên giáo viên</label>
          <input
            placeholder="Nhập tên giáo viên"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full text-black rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full text-black rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
          <input
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full text-black rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
          Add Teacher
        </button>
      </form>
    </section>
  )
}