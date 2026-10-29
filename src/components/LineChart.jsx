export default function LineChart({ points, format = (v) => v, label }) {
  if (points.length === 0) return <p className="muted">Aucune donnée pour le moment. La courbe apparaîtra dès les premières saisies.</p>
  const W = 600, H = 230, P = { l: 78, r: 16, t: 16, b: 30 }
  const ys = points.map((p) => p.y)
  const min = Math.min(0, ...ys), max = Math.max(...ys) || 1
  const n = points.length - 1 || 1
  const sx = (i) => (points.length === 1 ? W / 2 : P.l + (i * (W - P.l - P.r)) / n)
  const sy = (v) => H - P.b - ((v - min) / (max - min || 1)) * (H - P.t - P.b)
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${sx(i)},${sy(p.y)}`).join(' ')
  const ticks = [0, 0.5, 1].map((t) => min + (max - min) * t)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label={label}>
      {ticks.map((t) => (
        <g key={t}><line x1={P.l} x2={W - P.r} y1={sy(t)} y2={sy(t)} className="grid" /><text x={P.l - 8} y={sy(t) + 4} textAnchor="end">{format(t)}</text></g>
      ))}
      <path d={`${d} L${sx(points.length - 1)},${sy(min)} L${sx(0)},${sy(min)} Z`} className="area" />
      <path d={d} className="line" />
      {points.map((p, i) => <circle key={i} cx={sx(i)} cy={sy(p.y)} r="4" className="dot"><title>{p.x} : {format(p.y)}</title></circle>)}
      <text x={sx(0)} y={H - 8} textAnchor={points.length === 1 ? 'middle' : 'start'}>{points[0].x}</text>
      {points.length > 1 && <text x={sx(n)} y={H - 8} textAnchor="end">{points[n].x}</text>}
    </svg>
  )
}