import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import io from 'socket.io-client'

let socket

export default function MyOrders() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  
  const { data: orders = [], refetch } = useQuery({
    queryKey: ['myorders'],
    queryFn: () => axios.get('http://localhost:5000/api/orders/my', { withCredentials: true }).then(res => res.data)
  })

  useEffect(() => {
    if (!user) return
    socket = io('http://localhost:5000')
    socket.emit('join', `user_${user._id}`)

    socket.on('orderUpdate', () => {
      refetch()
    })

    return () => socket.disconnect()
  }, [user])

  if (!user) return <div className="text-center py-20 text-2xl">Please login first</div>

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-2xl text-gray-600">No orders yet. Start shopping!</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="bg-white rounded shadow p-6 mb-6">
            <div className="flex justify-between">
              <p className="text-xl font-bold">Order #{order._id.slice(-6)}</p>
              <span className={`px-4 py-2 rounded text-white ${order.status === 'delivered' ? 'bg-green-500' : 'bg-orange-500'}`}>
                {order.status.toUpperCase()}
              </span>
            </div>
            <p>Total: KSh {order.totalAmount}</p>
            <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  )
}