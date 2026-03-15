"use client"

export default function TeacherList({ teachers, setTeachers }) {
  const [editingId, setEditingId] = useState(null)
  const [tempData, setTempData] = useState({})

  const handleDelete = async id => {
    await fetch(`http://localhost:8080/teachers/${id}`, { method: "DELETE" })
    setTeachers(prev => prev.filter(t => t.id !== id))
  }

  const handleSave = async id => {
    const res = await fetch(`http://localhost:8080/teachers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempData),
    })
    const updated = await res.json()
    setTeachers(prev => prev.map(t => (t.id === id ? updated : t)))
    setEditingId(null)
    setTempData({})
  }

  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Teachers</h2>
          <p className="text-sm text-gray-500">Danh sách giáo viên</p>
        </div>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
          {teachers.length} items
        </span>
      </div>

      {teachers.length === 0 ? (
        <p className="text-sm text-gray-500">Chưa có giáo viên nào.</p>
      ) : (
        <div className="space-y-2">
          {teachers.map(t => {
            const isEditing = editingId === t.id
            return (
              <div
                key={t.id}
                className="text-black flex items-center justify-between rounded-lg border border-gray-100 bg-white px-3 py-2 hover:border-gray-200 hover:bg-gray-50"
              >
                <div className="text-sm flex flex-col gap-1">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={tempData.name || t.name}
                        onChange={e => setTempData(prev => ({ ...prev, name: e.target.value }))}
                        className="border rounded px-2 py-1"
                        placeholder="Name"
                      />
                      <input
                        type="email"
                        value={tempData.email || t.email}
                        onChange={e => setTempData(prev => ({ ...prev, email: e.target.value }))}
                        className="border rounded px-2 py-1"
                        placeholder="Email"
                      />
                      <input
                        type="text"
                        value={tempData.phone || t.phone}
                        onChange={e => setTempData(prev => ({ ...prev, phone: e.target.value }))}
                        className="border rounded px-2 py-1"
                        placeholder="Phone"
                      />
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.email}</p>
                      <p className="text-xs text-gray-500">{t.phone}</p>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSave(t.id)}
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
                        onClick={() => { setEditingId(t.id); setTempData({ name: t.name, email: t.email, phone: t.phone }) }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
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
}