import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL // https://skypharma-backend.onrender.com/api

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API}/auth/register`, form)
      alert('Registration successful! Please login.')
      navigate('/login')
    } catch (err) {
      alert('Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-3 border mb-4 rounded"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-3 border mb-4 rounded"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full p-3 border mb-6 rounded"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded font-bold">
          Register
        </button>
      </form>
    </div>
  )
}
