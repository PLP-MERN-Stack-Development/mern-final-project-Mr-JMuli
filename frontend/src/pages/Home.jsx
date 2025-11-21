import { Link } from 'react-router-dom'

export default function Home() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  return (
    <div className="text-center py-20 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-6xl font-bold text-blue-600 mb-6">SkyPharma </h1>
      <p className="text-2xl text-gray-700 mb-10">Your Trusted Online Pharmacy with Home Delivery</p>
      
      {user ? (
        <div className="space-x-6">
          <Link to="/medicines" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-700">
            Browse Medicines
          </Link>
          <Link to="/upload-prescription" className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-green-700">
            Upload Prescription
          </Link>
        </div>
      ) : (
        <div className="space-x-6">
          <Link to="/login" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold">Login</Link>
          <Link to="/register" className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold">Register Now</Link>
        </div>
      )}
    </div>
  )
}