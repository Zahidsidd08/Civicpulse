import { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const colors = { pothole: '#f97316', drainage: '#3b82f6', leakage: '#14b8a6' }
const labels = { pothole: 'Pothole', drainage: 'Blocked Drain', leakage: 'Water Leakage' }

// DEMO DATA. Dev 2 will replace this with real reports from Supabase.
const demoReports = [
  { id: 1, type: 'pothole', lat: 19.0760, lng: 72.8777, status: 'Reported' },
  { id: 2, type: 'drainage', lat: 19.0820, lng: 72.8810, status: 'In progress' },
  { id: 3, type: 'leakage', lat: 19.0700, lng: 72.8700, status: 'Reported' },
  { id: 4, type: 'pothole', lat: 19.0790, lng: 72.8790, status: 'Fixed' },
  { id: 5, type: 'drainage', lat: 19.0735, lng: 72.8850, status: 'Reported' },
]

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
          <MapContainer center={[19.076, 72.8777]} zoom={13} style={{ height: '70vh', width: '100%' }}>
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