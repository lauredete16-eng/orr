
import Inventory from '../components/Inventory.jsx'
import { Badge } from '../components/UI.jsx'
import { fmt } from '../store.jsx'

const S = ['Vérifié (démo)', 'En attente']

const fields = [
  { k: 'ref', l: 'Référence' },
  { k: 'label', l: 'Désignation' },
  { k: 'carat', l: 'Carats (unité)', t: 'number' },
  { k: 'color', l: 'Couleur' },
  { k: 'clarity', l: 'Pureté' },
  { k: 'cut', l: 'Taille' },
  { k: 'qty', l: 'Quantité', t: 'number' },
  { k: 'estValue', l: 'Valeur estimée par pièce (€)', t: 'number' },
  { k: 'status', l: 'Statut', t: 'select', o: S },
]

const cols = [
  { k: 'ref', l: 'Réf.' },
  { k: 'label', l: 'Désignation' },
  {
    l: 'Carats',
    f: (r) => `${r.carat} ct × ${r.qty}`,
  },
  { k: 'color', l: 'Couleur' },
  { k: 'clarity', l: 'Pureté' },
  { k: 'cut', l: 'Taille' },
  {
    l: 'Valeur estimée',
    f: (r) => fmt(Number(r.estValue || 0) * Number(r.qty || 0)),
  },
  {
    l: 'Statut',
    f: (r) => <Badge>{r.status}</Badge>,
  },
]

export default function Diamonds() {
  return (
    <Inventory
      title="Diamants"
      sub="Les valeurs estimées doivent être confirmées par une expertise indépendante."
      col="diamonds"
      fields={fields}
      cols={cols}
      empty={{
        ref: 'DEMO-DI-',
        label: '',
        carat: 1,
        color: 'F',
        clarity: 'VS1',
        cut: 'Excellent',
        qty: 1,
        estValue: 5000,
        status: S[1],
      }}
    />
  )
}
