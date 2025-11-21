import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL // e.g., https://skypharma-backend.onrender.com/api

export default function UploadPrescription() {
  const [files, setFiles] = useState([])
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    navigate('/login')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    files.forEach(file => formData.append('images', file))

    try {
      await axios.post(`${API}/prescriptions`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
      alert('Prescription uploaded! Pharmacist will review soon.')
      navigate('/my-orders')
    } catch (err) {
      alert('Upload failed')
      console.error(err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Upload Prescription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full p-4 border mb-6"
          onChange={e => setFiles(Array.from(e.target.files))}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded font-bold text-xl"
        >
          Upload & Submit for Approval
        </button>
      </form>
    </div>
  )
}
