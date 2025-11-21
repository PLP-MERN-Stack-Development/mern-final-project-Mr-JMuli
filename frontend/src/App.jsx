import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Medicines from './pages/Medicines'
import UploadPrescription from './pages/UploadPrescription'
import MyOrders from './pages/MyOrders'
import PharmacistDashboard from './pages/PharmacistDashboard'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/upload-prescription" element={<UploadPrescription />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/pharmacist" element={<PharmacistDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App