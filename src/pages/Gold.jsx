
import Inventory from '../components/Inventory.jsx'
import { Badge } from '../components/UI.jsx'
import { useStore, fmt, goldValue } from '../store.jsx'

const S = ['Verified (Demo)', 'Pending']

const fields = [
  { k: 'ref', l: 'Reference' },
  { k: 'label', l: 'Description' },
  { k: 'weightG', l: 'Unit weight (g)', t: 'number' },
  { k: 'purity', l: 'Purity (‰)', t: 'number' },
  { k: 'qty', l: 'Quantity', t: 'number' },
  { k: 'location', l: 'Storage location' },
  { k: 'status', l: 'Status', t: 'select', o: S },
]

export default function Gold() {
  const { data } = useStore()

  const cols = [
    { k: 'ref', l: 'Ref.' },
    { k: 'label', l: 'Description' },
    { k: 'qty', l: 'Qty' },
    {
      l: 'Total weight',
      f: (r) =>
        ((r.weightG * r.qty) / 1000).toLocaleString('en-US') + ' kg',
    },
    {
      l: 'Purity',
      f: (r) => r.purity + ' ‰',
    },
    { k: 'location', l: 'Storage location' },
    {
      l: 'Estimated value',
      f: (r) => fmt(goldValue(r, data.profile.spot)),
    },
    {
      l: 'Status',
      f: (r) => <Badge>{r.status}</Badge>,
    },
  ]

  return (
    <Inventory
      title="Gold Inventory"
      sub="Value calculated using the demonstration gold price configured in the profile."
      col="gold"
      fields={fields}
      cols={cols}
      empty={{
        ref: 'DEMO-AU-',
        label: '',
        weightG: 100,
        purity: 999.9,
        qty: 1,
        location: 'Fictional Vault A',
        status: S[1],
      }}
    />
  )
}
