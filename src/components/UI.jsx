import { X } from 'lucide-react'
export const DemoBanner = () => <div className="banner" role="status">DÉMONSTRATION — données entièrement fictives, aucun actif réel</div>
export const Badge = ({ children }) => {
  const t = /attente|relire|Planifi/i.test(children) ? 'warn' : 'ok'
  return <span className={'badge ' + t}>{children}</span>
}
export const PageHead = ({ title, sub, children }) => (
  <div className="pagehead"><div><h1>{title}</h1>{sub && <p className="muted">{sub}</p>}</div><div>{children}</div></div>
)
export const Stat = ({ icon: Icon, label, value, note }) => (
  <div className="card stat"><Icon size={20} /><span className="muted">{label}</span><strong>{value}</strong>{note && <small className="muted">{note}</small>}</div>
)
export function Modal({ title, onClose, children }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="row between"><h2>{title}</h2><button className="icon" onClick={onClose} aria-label="Fermer"><X size={18} /></button></div>
        {children}
      </div>
    </div>
  )
}
export function Table({ cols, rows, actions }) {
  return (
    <div className="tablewrap"><table>
      <thead><tr>{cols.map((c) => <th key={c.l}>{c.l}</th>)}{actions && <th />}</tr></thead>
      <tbody>
        {rows.length === 0 && <tr><td colSpan={cols.length + 1} className="muted">Aucun élément. Utilisez le bouton Ajouter pour en créer un.</td></tr>}
        {rows.map((r) => <tr key={r.id}>{cols.map((c) => <td key={c.l}>{c.f ? c.f(r) : r[c.k]}</td>)}{actions && <td className="actions">{actions(r)}</td>}</tr>)}
      </tbody>
    </table></div>
  )
}
