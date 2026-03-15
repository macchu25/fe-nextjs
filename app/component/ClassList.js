"use client"

import { forwardRef, useEffect, useImperativeHandle, useState, useCallback } from "react"
import { deleteClass, getClass, getTeachers, updateClass } from "../lib/api"

const ClassList = forwardRef(function ClassList(_, ref) {
  const [classes, setClasses] = useState([])
  const [teachers, setTeachers] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [tempData, setTempData] = useState({}) // dữ liệu tạm thời khi edit

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const data = await getTeachers()
        setTeachers(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Failed to load teachers:", err)
      }
    }
    fetchTeachers()
  }, [])

  const loadClasses = useCallback(async () => {
    try {
      const data = await getClass()
      setClasses(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Failed to load classes:", err)
    }
  }, [])

  useImperativeHandle(ref, () => ({ reload: loadClasses }))

  useEffect(() => {
    async function fetchClasses() {
      await loadClasses()
    }
    fetchClasses()
  }, [loadClasses])

  // Delete class
  const handleDelete = async (id) => {
    try {
      await deleteClass(id)
      await loadClasses()
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  // Save row edit
  const handleSave = async (id) => {
    try {
      await updateClass(id, tempData) 
      setEditingId(null)
      setTempData({})
      await loadClasses()
    } catch (err) {
      console.error("Update failed:", err)
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Classes</h2>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
          {classes.length} items
        </span>
      </div>

      {classes.length === 0 ? (
        <p className="text-sm text-gray-500">Chưa có lớp nào.</p>
      ) : (
        <div className="space-y-2">
          {classes.map(c => {
            const isEditing = editingId === c.id
            return (
              <div
                key={c.id}
                className="text-black flex items-center justify-between rounded-lg border border-gray-100 bg-white px-3 py-2 hover:border-gray-200 hover:bg-gray-50 mb-2"
              >
                <div className="flex gap-4 items-center">
                  {/* Class Name */}
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.name || c.name}
                      onChange={e => setTempData(prev => ({ ...prev, name: e.target.value }))}
                      className="border rounded px-2 py-1 w-40"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{c.name}</p>
                  )}

                  {/* Teacher */}
                  {isEditing ? (
                    <select
                      value={tempData.teacher_id || c.teacher_id}
                      onChange={e => setTempData(prev => ({ ...prev, teacher_id: e.target.value }))}
                      className="border rounded px-2 py-1"
                    >
                      <option value="">Chọn giáo viên</option>
                      {teachers.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-xs text-gray-500">
               Teacher: {teachers.find(c => c.id === Number(t.teacher_id))?.name || "Unknown"}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  {isEditing ? (  
                    <>
                      <button
                        onClick={() => handleSave(c.id)}
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
                        onClick={() => { setEditingId(c.id); setTempData({ name: c.name, teacher_id: c.teacher_id }) }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
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

export default ClassList