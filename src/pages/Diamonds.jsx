
import Inventory from '../components/Inventory.jsx'
import { Badge } from '../components/UI.jsx'
import { fmt } from '../store.jsx'

const S = ['Verified (Demo)', 'Pending']

const fields = [
  { k: 'ref', l: 'Reference' },
  { k: 'label', l: 'Description' },
  { k: 'carat', l: 'Carats (unit)', t: 'number' },
  { k: 'color', l: 'Color' },
  { k: 'clarity', l: 'Clarity' },
  { k: 'cut', l: 'Cut' },
  { k: 'qty', l: 'Quantity', t: 'number' },
  { k: 'estValue', l: 'Estimated value per stone (€)', t: 'number' },
  { k: 'status', l: 'Status', t: 'select', o: S },
]

const cols = [
  { k: 'ref', l: 'Ref.' },
  { k: 'label', l: 'Description' },
  {
    l: 'Carats',
    f: (r) => `${r.carat} ct × ${r.qty}`,
  },
  { k: 'color', l: 'Color' },
  { k: 'clarity', l: 'Clarity' },
  { k: 'cut', l: 'Cut' },
  {
    l: 'Estimated value',
    f: (r) => fmt(Number(r.estValue || 0) * Number(r.qty || 0)),
  },
  {
    l: 'Status',
    f: (r) => <Badge>{r.status}</Badge>,
  },
]

export default function Diamonds() {
  return (
    <Inventory
      title="Diamonds"
      sub="Estimated values must be confirmed by an independent appraisal."
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
