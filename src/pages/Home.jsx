import { Link } from 'react-router-dom'

const steps = [
  { n: '01', title: 'Snap a photo', text: 'Take a picture of a pothole, blocked drain or water leak.' },
  { n: '02', title: 'AI identifies it', text: 'The issue type is detected automatically and your location is attached.' },
  { n: '03', title: 'See it on the map', text: 'Reports appear live on a city map so everyone can see what needs fixing.' },
]

const features = [
  { icon: '📸', title: 'Photo-based reporting', text: 'Report an issue in under a minute with just your phone camera.' },
  { icon: '🗺️', title: 'Live issue map', text: 'Every report is pinned on a map, colour-coded by issue type.' },
  { icon: '🔥', title: 'Hotspot detection', text: 'Areas with repeated reports are flagged so they get attention first.' },
  { icon: '🏆', title: 'Area leaderboard', text: 'See which areas are most active and how many issues got fixed.' },
]

export default function Home() {
  return (
    <main className="bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:py-32">
          <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-300">
            #BuildForMyCity
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Every pothole. Every drain. Every leak.{' '}
            <span className="text-teal-400">One pulse.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Water damages our roads. A blocked drain floods the street, a leak
            weakens the surface, and a pothole is born. CivicPulse connects all
            three so your city can fix problems before they grow.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/report"
              className="rounded-xl bg-teal-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-400"
            >
              Report an Issue
            </Link>
            <Link
              to="/map"
              className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              View Live Map
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="text-sm font-bold text-teal-400">{s.n}</span>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-slate-300">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">Built to go beyond reporting</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-slate-950 p-6">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">See a problem? Don't walk past it.</h2>
        <p className="mt-4 text-slate-300">It takes less than a minute to make your street safer.</p>
        <Link
          to="/report"
          className="mt-8 inline-block rounded-xl bg-teal-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-teal-400"
        >
          Report Now
        </Link>
      </section>
    </main>
  )
}