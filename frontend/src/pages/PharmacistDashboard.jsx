import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL // e.g., https://skypharma-backend.onrender.com/api

export default function PharmacistDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (user?.role !== 'pharmacist') return <div>Access denied</div>

  const { data: prescriptions = [] } = useQuery({
    queryKey: ['prescriptions'],
    queryFn: () =>
      axios
        .get(`${API}/prescriptions/my?all=true`, { withCredentials: true })
        .then(res => res.data)
  })

  const approve = async (id) => {
    await axios.patch(`${API}/prescriptions/${id}/approve`, {}, { withCredentials: true })
    alert('Prescription approved!')
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Pharmacist Dashboard</h1>
      <h2 className="text-2xl mb-6">Pending Prescriptions</h2>
      {prescriptions.filter(p => p.status === 'pending').map(p => (
        <div key={p._id} className="bg-white p-6 rounded shadow mb-6">
          <p>User ID: {p.user}</p>
          <div className="grid grid-cols-3 gap-4 my-4">
            {p.images.map(img => (
              <img key={img} src={img} alt="rx" className="rounded border" />
            ))}
          </div>
          <button
            onClick={() => approve(p._id)}
            className="bg-green-600 text-white px-6 py-3 rounded font-bold"
          >
            Approve Prescription
          </button>
        </div>
      ))}
    </div>
  )
}
