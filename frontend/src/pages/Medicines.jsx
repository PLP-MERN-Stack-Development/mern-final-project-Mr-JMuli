import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL;

export default function Medicines() {
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ['medicines'],
    queryFn: () => axios.get(`${API}/medicines`).then(res => res.data)
  })

  if (isLoading) return <div className="text-center py-20 text-2xl">Loading medicines...</div>

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">All Medicines</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map(med => (
          <div key={med._id} className="bg-white rounded-lg shadow hover:shadow-xl transition p-6">
            {med.image && <img src={med.image} alt={med.name} className="w-full h-48 object-cover rounded mb-4" />}
            <h3 className="font-bold text-xl">{med.name}</h3>
            <p className="text-gray-600">{med.genericName}</p>
            <p className="text-2xl font-bold text-green-600 mt-2">KSh {med.price}</p>
            {med.requiresPrescription && <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">Rx Required</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
