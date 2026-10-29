
import { useStore } from '../store.jsx'
import { PageHead } from '../components/UI.jsx'

const initialHistory = [
  { id: 1, date: '2020-03-12', action: 'Ouverture du dossier', detail: 'Date et événement à confirmer' },
  { id: 2, date: '2020-08-24', action: 'Collecte de documents', detail: 'Date et événement à confirmer' },
  { id: 3, date: '2020-12-15', action: 'Contrôle administratif', detail: 'Date et événement à confirmer' },
  { id: 4, date: '2021-04-09', action: 'Mise à jour du dossier', detail: 'Date et événement à confirmer' },
  { id: 5, date: '2021-10-18', action: 'Vérification documentaire', detail: 'Date et événement à confirmer' },
  { id: 6, date: '2022-02-07', action: 'Examen des actifs déclarés', detail: 'Date et événement à confirmer' },
  { id: 7, date: '2022-06-21', action: 'Évaluation des actifs', detail: 'Date et événement à confirmer' },
  { id: 8, date: '2022-11-14', action: 'Suivi documentaire', detail: 'Date et événement à confirmer' },
  { id: 9, date: '2023-04-17', action: 'Revue du dossier', detail: 'Date et événement à confirmer' },
  { id: 10, date: '2023-09-26', action: 'Mise à jour du suivi', detail: 'Date et événement à confirmer' },
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
        title="Historique"
        sub="Historique et suivi administratif du dossier."
      />

      <div className="card flush" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '14px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '14px', textAlign: 'left' }}>Opération</th>
              <th style={{ padding: '14px', textAlign: 'left' }}>Détail</th>
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
