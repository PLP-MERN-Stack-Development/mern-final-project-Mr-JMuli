import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logout = () => {
    localStorage.removeItem('user')
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
    queryClient.clear()
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SkyPharma ☁️</Link>
        <div className="space-x-6">
          <Link to="/medicines">Medicines</Link>
          {user ? (
            <>
              <Link to="/my-orders">My Orders</Link>
              {user.role === 'pharmacist' && <Link to="/pharmacist">Dashboard</Link>}
              <span>Hello, {user.name}!</span>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}