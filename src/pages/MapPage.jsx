import { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { demoReports } from '../lib/demoData'
const colors = { pothole: '#f97316', drainage: '#3b82f6', leakage: '#14b8a6' }
const labels = { pothole: 'Pothole', drainage: 'Blocked Drain', leakage: 'Water Leakage' }



export default function MapPage() {
  const [filter, setFilter] = useState('all')
  const reports = demoReports.filter((r) => filter === 'all' || r.type === filter)

  return (
    <main className="bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Live Issue Map</h1>
        <p className="mt-2 text-slate-300">Showing demo data for now.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {['all', 'pothole', 'drainage', 'leakage'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === f
                  ? 'bg-teal-500 text-slate-950'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              {f === 'all' ? 'All' : labels[f]}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <MapContainer center={[19.1, 72.88]} zoom={11} style={{ height: '70vh', width: '100%' }}>
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {reports.map((r) => (
              <CircleMarker
                key={r.id}
                center={[r.lat, r.lng]}
                radius={10}
                pathOptions={{ color: colors[r.type], fillColor: colors[r.type], fillOpacity: 0.7 }}
              >
                <Popup>
                  <strong>{labels[r.type]}</strong>
                  <br />
                  Status: {r.status}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
          {Object.keys(colors).map((k) => (
            <span key={k} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: colors[k] }} />
              {labels[k]}
            </span>
          ))}
        </div>
      </div>
    </main>
  )
}