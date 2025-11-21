import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://skypharma-backend.onrender.com/api/auth/login', form)
      localStorage.setItem('user', JSON.stringify(res.data))
      navigate('/')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="w-full p-3 border mb-4 rounded" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" className="w-full p-3 border mb-6 rounded" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-bold">Login</button>
      </form>
      <p className="mt-4 text-center">Pharmacist? Login with email: pharm@test.com / pass: 123456</p>
    </div>
  )
}