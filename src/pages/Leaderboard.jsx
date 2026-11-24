import { demoReports } from '../lib/demoData'

const medals = ['🥇', '🥈', '🥉']

function buildAreas(reports) {
  const byArea = {}
  for (const r of reports) {
    if (!byArea[r.area]) {
      byArea[r.area] = { area: r.area, total: 0, fixed: 0, open: 0, openTypes: new Set() }
    }
    const a = byArea[r.area]
    a.total += 1
    if (r.status === 'Fixed') {
      a.fixed += 1
    } else {
      a.open += 1
      a.openTypes.add(r.type)
    }
  }
  return Object.values(byArea)
}

export default function Leaderboard() {
  const areas = buildAreas(demoReports)
  const ranked = [...areas].sort((a, b) => b.fixed - a.fixed || b.total - a.total)
  const hotspots = areas.filter((a) => a.open >= 3)
  const chain = areas.filter((a) => a.openTypes.has('drainage') && a.openTypes.has('pothole'))

  const total = demoReports.length
  const fixed = demoReports.filter((r) => r.status === 'Fixed').length

  return (
    <main className="bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Area Leaderboard</h1>
        <p className="mt-2 text-slate-300">Which areas report and fix the most. Showing demo data for now.</p>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-3xl font-bold text-teal-400">{total}</div>
            <div className="text-sm text-slate-300">Total reports</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-3xl font-bold text-teal-400">{fixed}</div>
            <div className="text-sm text-slate-300">Fixed</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-3xl font-bold text-teal-400">{total - fixed}</div>
            <div className="text-sm text-slate-300">Still open</div>
          </div>
        </div>

        {/* Ranking */}
        <div className="mt-8 space-y-3">
          {ranked.map((a, i) => {
            const pct = Math.round((a.fixed / a.total) * 100)
            return (
              <div key={a.area} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-center text-xl">{medals[i] || i + 1}</span>
                    <span className="font-semibold">{a.area}</span>
                  </div>
                  <span className="text-sm text-slate-300">
                    {a.fixed}/{a.total} fixed
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-teal-400" style={{ width: pct + '%' }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Hotspots */}
        <h2 className="mt-12 text-2xl font-bold">🔥 Hotspots</h2>
        <p className="mt-1 text-sm text-slate-400">Areas with 3 or more open reports.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {hotspots.length === 0 && <p className="text-slate-400">No hotspots right now.</p>}
          {hotspots.map((a) => (
            <div key={a.area} className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4">
              <div className="font-semibold">{a.area}</div>
              <div className="text-sm text-slate-300">{a.open} open reports need attention</div>
            </div>
          ))}
        </div>

        {/* Water chain alert */}
        <h2 className="mt-12 text-2xl font-bold">🌊 Water damage alert</h2>
        <p className="mt-1 text-sm text-slate-400">
          Blocked drain and pothole open in the same area. Water is likely damaging the road.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {chain.length === 0 && <p className="text-slate-400">No alerts right now.</p>}
          {chain.map((a) => (
            <div key={a.area} className="rounded-2xl border border-blue-400/30 bg-blue-400/10 p-4">
              <div className="font-semibold">{a.area}</div>
              <div className="text-sm text-slate-300">Fix the drain first, then repair the road.</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}