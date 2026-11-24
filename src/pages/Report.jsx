import { useState } from 'react'

const types = [
  { value: 'pothole', label: 'Pothole', icon: '🕳️' },
  { value: 'drainage', label: 'Blocked Drain', icon: '🌊' },
  { value: 'leakage', label: 'Water Leakage', icon: '💧' },
]

export default function Report() {
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState('')
  const [type, setType] = useState('pothole')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState(null)
  const [locMsg, setLocMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    setPhoto(file)
    setPreview(URL.createObjectURL(file))
  }

  function getLocation() {
    if (!navigator.geolocation) {
      setLocMsg('Location is not supported on this device')
      return
    }
    setLocMsg('Getting your location...')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocMsg('')
      },
      () => setLocMsg('Could not get location. Please allow location access.')
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!photo) return alert('Please add a photo')
    if (!location) return alert('Please add your location')
    console.log({ type, description, location, photo })
    setSubmitted(true)
  }

  function reset() {
    setPhoto(null)
    setPreview('')
    setType('pothole')
    setDescription('')
    setLocation(null)
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <div className="text-5xl">✅</div>
          <h1 className="mt-4 text-2xl font-bold">Report submitted</h1>
          <p className="mt-2 text-slate-300">Thank you for helping make your city better.</p>
          <button
            onClick={reset}
            className="mt-6 rounded-xl bg-teal-500 px-6 py-3 font-semibold text-slate-950 hover:bg-teal-400"
          >
            Report another issue
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold">Report an Issue</h1>
        <p className="mt-2 text-slate-300">It takes less than a minute.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Photo */}
          <div>
            <label className="mb-2 block text-sm font-semibold">1. Add a photo</label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-6 text-center hover:border-teal-400">
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-64 rounded-xl" />
              ) : (
                <>
                  <span className="text-4xl">📸</span>
                  <span className="mt-2 text-slate-300">Tap to take or upload a photo</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhoto}
                className="hidden"
              />
            </label>
          </div>

          {/* Type */}
          <div>
            <label className="mb-2 block text-sm font-semibold">2. Issue type</label>
            <div className="grid grid-cols-3 gap-3">
              {types.map((t) => (
                <button
                  type="button"
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`rounded-xl border p-3 text-center text-sm font-medium transition ${
                    type === t.value
                      ? 'border-teal-400 bg-teal-400/10 text-teal-300'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30'
                  }`}
                >
                  <div className="text-2xl">{t.icon}</div>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-semibold">3. Location</label>
            <button
              type="button"
              onClick={getLocation}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 font-medium hover:bg-white/10"
            >
              📍 Use my current location
            </button>
            {location && (
              <p className="mt-2 text-sm text-teal-300">
                Location added: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
              </p>
            )}
            {locMsg && <p className="mt-2 text-sm text-slate-400">{locMsg}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold">4. Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Any details that help, like near which landmark"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-slate-500 outline-none focus:border-teal-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-teal-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-400"
          >
            Submit Report
          </button>
        </form>
      </div>
    </main>
  )
}