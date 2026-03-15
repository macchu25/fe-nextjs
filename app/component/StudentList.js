"use client"

import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { deleteStudent, getStudents,getClass } from "../lib/api"

const StudentList = forwardRef(function StudentList(_, ref) {

  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])

  useEffect(() => {
    async function loadClasses() {
      const data = await getClass()
      setClasses(Array.isArray(data) ? data : [])
    }

    loadClasses()
  }, [])

  async function loadStudents() {
    const data = await getStudents()
    setStudents(Array.isArray(data) ? data : [])
  }

  useImperativeHandle(ref, () => ({
    reload: loadStudents
  }))
useEffect(() => {
  async function fetchStudents() {
    const data = await getStudents()
    setStudents(Array.isArray(data) ? data : [])
  }

  fetchStudents()
}, [])
  async function handleDelete(id) {
    await deleteStudent(id)
    await loadStudents()
  }

  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Students</h2>
          <p className="text-sm text-gray-500">Danh sách học sinh hiện có</p>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
          {students.length} items
        </span>
      </div>

      {students.length === 0 ? (
        <p className="text-sm text-gray-500">Chưa có học sinh nào.</p>
      ) : (
        <div className="space-y-2">
          {students.map(sh => (
            <div
              key={sh.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-3 py-2 hover:border-gray-200 hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-900">{sh.name}</p>
                <p className="text-xs text-gray-500">
                  Class ID: {classes.find(s => s.id === Number(sh.class_id))?.name || "Unknown"}
                </p>
              </div>

              <button
                onClick={() => handleDelete(sh.id)}
                className="rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
              >
                Delete
              </button>

            </div>
          ))}
        </div>
      )}

    </section>
  )
})

export default StudentList