
import Inventory from '../components/Inventory.jsx'
import { Badge } from '../components/UI.jsx'
import { fmt } from '../store.jsx'

const S = ['Scheduled', 'Completed']

const fields = [
  { k: 'asset', l: 'Asset Reference' },
  { k: 'date', l: 'Date', t: 'date' },
  { k: 'expert', l: 'Appraiser (fictional)' },
  { k: 'amount', l: 'Estimated Amount (€)', t: 'number' },
  { k: 'status', l: 'Status', t: 'select', o: S },
]

const cols = [
  { k: 'asset', l: 'Asset' },
  { k: 'date', l: 'Date' },
  { k: 'expert', l: 'Appraiser' },
  { l: 'Amount', f: (r) => fmt(r.amount) },
  { l: 'Status', f: (r) => <Badge>{r.status}</Badge> },
]

export default function Valuations() {
  return (
    <Inventory
      title="Valuations"
      sub="Appraisal history; all entries are fictional."
      col="valuations"
      fields={fields}
      cols={cols}
      empty={{
        asset: 'DEMO-AU-001',
        date: new Date().toISOString().slice(0, 10),
        expert: 'Example Firm (fictional)',
        amount: 0,
        status: S[0],
      }}
    />
  )
}
