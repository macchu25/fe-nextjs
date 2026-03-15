"use client"

import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react"
import { getStudents, deleteStudent, updateStudent, getClass } from "../lib/api"

const StudentList = forwardRef(function StudentList(_, ref) {

  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [tempData, setTempData] = useState({}) // dữ liệu tạm khi edit

  // Load classes
  useEffect(() => {
    async function loadClasses() {
      const data = await getClass()
      setClasses(Array.isArray(data) ? data : [])
    }
    loadClasses()
  }, [])

  const loadStudents = useCallback(async () => {
    const data = await getStudents()
    setStudents(Array.isArray(data) ? data : [])
  }, [])

  
  useImperativeHandle(ref, () => ({ reload: loadStudents }))

  // Load students lần đầu và khi reload
 
useEffect(() => {
  const fetchData = async () => {
    await loadStudents(); 
  }
  fetchData();
}, []); 

  const handleDelete = async (id) => {
    await deleteStudent(id)
    await loadStudents()
  }

  const handleSave = async (id) => {
    await updateStudent(id, tempData)
    setEditingId(null)
    setTempData({})
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
          {students.map(s => {
            const isEditing = editingId === s.id
            return (
              <div
                key={s.id}
                className="text-black flex items-center justify-between rounded-lg border border-gray-100 bg-white px-3 py-2 hover:border-gray-200 hover:bg-gray-50"
              >
                <div className="text-sm flex flex-col gap-1">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={tempData.name || s.name}
                        onChange={e => setTempData(prev => ({ ...prev, name: e.target.value }))}
                        className="border rounded px-2 py-1"
                        placeholder="Name"
                      />
                        <input
                        type="text"
                        value={tempData.email || s.email}
                        onChange={e => setTempData(prev => ({ ...prev, email: e.target.value }))}
                        className="border rounded px-2 py-1"
                        placeholder="Email"
                      />
                      <select
                        value={tempData.class_id || s.class_id}
                        onChange={e => setTempData(prev => ({ ...prev, class_id: e.target.value }))}
                        className="border rounded px-2 py-1"
                      >
                        <option value="">Chọn lớp</option>
                        {classes.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-500">
                        Class: {classes.find(c => c.id === Number(s.class_id))?.name || "Unknown"}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSave(s.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => { setEditingId(null); setTempData({}) }}
                        className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 text-xs"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setEditingId(s.id); setTempData({ name: s.name, class_id: s.class_id }) }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

    </section>
  )
})

export default StudentList