import Inventory from '../components/Inventory.jsx'
import { Badge } from '../components/UI.jsx'
import { fmt } from '../store.jsx'
const S = ['Planifiée', 'Terminée']
const fields = [
  { k: 'asset', l: 'Référence de l’actif' }, { k: 'date', l: 'Date', t: 'date' }, { k: 'expert', l: 'Expert (fictif)' },
  { k: 'amount', l: 'Montant estimé (€)', t: 'number' }, { k: 'status', l: 'Statut', t: 'select', o: S },
]
const cols = [
  { k: 'asset', l: 'Actif' }, { k: 'date', l: 'Date' }, { k: 'expert', l: 'Expert' },
  { l: 'Montant', f: (r) => fmt(r.amount) }, { l: 'Statut', f: (r) => <Badge>{r.status}</Badge> },
]
export default function Valuations() {
  return <Inventory title="Estimations" sub="Historique des expertises, toutes fictives." col="valuations" fields={fields} cols={cols}
    empty={{ asset: 'DEMO-AU-001', date: new Date().toISOString().slice(0, 10), expert: 'Cabinet Exemple (fictif)', amount: 0, status: S[0] }} />
}
