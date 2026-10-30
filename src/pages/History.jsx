
import { useStore } from '../store.jsx'
import { PageHead } from '../components/UI.jsx'

const initialHistory = [
  { id: 1, date: '2020-03-12', action: 'File opening', detail: 'Date and event to be confirmed' },
  { id: 2, date: '2020-08-24', action: 'Document collection', detail: 'Date and event to be confirmed' },
  { id: 3, date: '2020-12-15', action: 'Administrative review', detail: 'Date and event to be confirmed' },
  { id: 4, date: '2021-04-09', action: 'File update', detail: 'Date and event to be confirmed' },
  { id: 5, date: '2021-10-18', action: 'Document verification', detail: 'Date and event to be confirmed' },
  { id: 6, date: '2022-02-07', action: 'Review of declared assets', detail: 'Date and event to be confirmed' },
  { id: 7, date: '2022-06-21', action: 'Asset valuation', detail: 'Date and event to be confirmed' },
  { id: 8, date: '2022-11-14', action: 'Document follow-up', detail: 'Date and event to be confirmed' },
  { id: 9, date: '2023-04-17', action: 'File review', detail: 'Date and event to be confirmed' },
  { id: 10, date: '2023-09-26', action: 'Tracking update', detail: 'Date and event to be confirmed' },
]

export default function History() {
  const { data } = useStore()

  const savedHistory = Array.isArray(data?.history)
    ? data.history
    : []

  const history = savedHistory.length > 0
    ? [...savedHistory].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    : initialHistory

  return (
    <>
      <PageHead
        title="History"
        sub="Administrative history and file tracking."
      />

      <div className="card flush" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '14px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '14px', textAlign: 'left' }}>Operation</th>
              <th style={{ padding: '14px', textAlign: 'left' }}>Details</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: '14px', borderTop: '1px solid #ddd' }}>
                  {item.date || '—'}
                </td>
                <td style={{ padding: '14px', borderTop: '1px solid #ddd' }}>
                  {item.action || '—'}
                </td>
                <td style={{ padding: '14px', borderTop: '1px solid #ddd' }}>
                  {item.detail || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
