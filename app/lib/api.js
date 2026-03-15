export const TEACHER_API_URL = "https://be-go-production.up.railway.app/teacher";
export const CLASS_API_URL = "https://be-go-production.up.railway.app/class";
export const STUDENT_API_URL = "https://be-go-production.up.railway.app/student";

export async function getTeachers() {
    const res =await fetch(TEACHER_API_URL)
    return res.json()
}
export async function createTeachers(data) {
    const res =await fetch(TEACHER_API_URL,{
        method: "POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(data)

    })
    return res.json()
}
export async function updateTeachers(id,data) {
    const res =await fetch(`${TEACHER_API_URL}/${id}`,{
        method: "PUT",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(data)
        
    })
  return res.json()
}
export async function deleteTeachers(id) {
    const res =await fetch(`${TEACHER_API_URL}/${id}`,{
        method: "DELETE",
       
       
        
    })
     return res.json()

     
}











export async function getClass() {
    const res =await fetch(CLASS_API_URL)
    return res.json()
}
export async function createClass(data) {
    const res =await fetch(CLASS_API_URL,{
        method: "POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(data)

    })
    return res.json()
}
export async function updateClass(id,data) {
    const res =await fetch(`${CLASS_API_URL}/${id}`,{
        method: "PUT",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(data)
        
    })
  return res.json()
}
export async function deleteClass(id) {
    const res =await fetch(`${CLASS_API_URL}/${id}`,{
        method: "DELETE",
       
       
        
    })
     return res.json()

     
}

export async function getStudents() {
    const res = await fetch(STUDENT_API_URL)
    return res.json()
}

export async function createStudent(data) {
    const res = await fetch(STUDENT_API_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    })
    return res.json()
}

export async function updateStudent(id, data) {
    const res = await fetch(`${STUDENT_API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    })
    return res.json()
}export async function deleteStudent(id) {
    const res = await fetch(`${STUDENT_API_URL}/${id}`, {
        method: "DELETE",
    })
    return res.json()
}
