import { useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useStore } from '../store.jsx'
import { Modal, PageHead, Table } from './UI.jsx'
export default function Inventory({ title, sub, col, fields, cols, empty }) {
  const { data, save, remove } = useStore()
  const [edit, setEdit] = useState(null)
  const [q, setQ] = useState('')
  const rows = data[col].filter((r) => JSON.stringify(r).toLowerCase().includes(q.toLowerCase()))
  const submit = (e) => {
    e.preventDefault()
    const it = { ...edit }
    fields.forEach((f) => { if (f.t === 'number') it[f.k] = Number(it[f.k]) || 0 })
    save(col, it); setEdit(null)
  }
  return (
    <>
      <PageHead title={title} sub={sub}><button className="btn" onClick={() => setEdit({ ...empty })}><Plus size={16} /> Ajouter</button></PageHead>
      <div className="search"><Search size={16} /><input placeholder="Rechercher…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Rechercher" /></div>
      <div className="card flush">
        <Table cols={cols} rows={rows} actions={(r) => (<>
          <button className="icon" aria-label="Modifier" onClick={() => setEdit(r)}><Pencil size={16} /></button>
          <button className="icon" aria-label="Supprimer" onClick={() => window.confirm('Supprimer cet élément de démonstration ?') && remove(col, r.id)}><Trash2 size={16} /></button></>)} />
      </div>
      {edit && (
        <Modal title={edit.id ? 'Modifier' : 'Ajouter'} onClose={() => setEdit(null)}>
          <form onSubmit={submit} className="form">
            {fields.map((f) => (
              <label key={f.k}>{f.l}
                {f.t === 'select'
                  ? <select value={edit[f.k]} onChange={(e) => setEdit({ ...edit, [f.k]: e.target.value })}>{f.o.map((o) => <option key={o}>{o}</option>)}</select>
                  : <input type={f.t || 'text'} step="any" required value={edit[f.k]} onChange={(e) => setEdit({ ...edit, [f.k]: e.target.value })} />}
              </label>
            ))}
            <button className="btn" type="submit">Enregistrer</button>
          </form>
        </Modal>
      )}
    </>
  )
}
