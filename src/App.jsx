import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Report from './pages/Report'
import MapPage from './pages/MapPage'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}