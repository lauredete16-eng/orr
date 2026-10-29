import Inventory from '../components/Inventory.jsx'
import { Badge } from '../components/UI.jsx'
import { useStore, fmt, goldValue } from '../store.jsx'
const S = ['Vérifié (démo)', 'En attente']
const fields = [
  { k: 'ref', l: 'Référence' }, { k: 'label', l: 'Désignation' }, { k: 'weightG', l: 'Poids unitaire (g)', t: 'number' },
  { k: 'purity', l: 'Pureté (‰)', t: 'number' }, { k: 'qty', l: 'Quantité', t: 'number' }, { k: 'location', l: 'Emplacement' },
  { k: 'status', l: 'Statut', t: 'select', o: S },
]
export default function Gold() {
  const { data } = useStore()
  const cols = [
    { k: 'ref', l: 'Réf.' }, { k: 'label', l: 'Désignation' }, { k: 'qty', l: 'Qté' },
    { l: 'Poids total', f: (r) => ((r.weightG * r.qty) / 1000).toLocaleString('fr-FR') + ' kg' },
    { l: 'Pureté', f: (r) => r.purity + ' ‰' }, { k: 'location', l: 'Emplacement' },
    { l: 'Valeur estimée', f: (r) => fmt(goldValue(r, data.profile.spot)) }, { l: 'Statut', f: (r) => <Badge>{r.status}</Badge> },
  ]
  return <Inventory title="Inventaire d’or" sub="Valeur calculée avec le cours de démonstration défini dans le profil." col="gold" fields={fields} cols={cols}
    empty={{ ref: 'DEMO-AU-', label: '', weightG: 100, purity: 999.9, qty: 1, location: 'Coffre fictif A', status: S[1] }} />
}
