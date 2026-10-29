
import { Link } from 'react-router-dom'
import {
  Coins,
  Gem,
  Scale,
  FileText,
  ArrowUpRight,
  Clock3,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react'

import { useStore, fmt } from '../store.jsx'
import { PageHead, Stat, Badge } from '../components/UI.jsx'

export default function Dashboard() {
  const { data } = useStore()

  const profile = data?.profile ?? {}
  const gold = Array.isArray(data?.gold) ? data.gold : []
  const diamonds = Array.isArray(data?.diamonds) ? data.diamonds : []
  const valuations = Array.isArray(data?.valuations) ? data.valuations : []
  const documents = Array.isArray(data?.documents) ? data.documents : []
  const history = Array.isArray(data?.history) ? data.history : []

  const spot = Number(profile.spot) || 0

  // Nombre total de lingots.
  const lingotCount = gold.reduce(
    (sum, row) => sum + (Number(row.qty) || 0),
    0
  )

  // Poids total en kilogrammes.
  const kg = gold.reduce((sum, row) => {
    const declaredWeight = Number(row.declaredTotalWeightKg)

    if (Number.isFinite(declaredWeight) && declaredWeight > 0) {
      return sum + declaredWeight
    }

    return (
      sum +
      ((Number(row.weightG) || 0) * (Number(row.qty) || 0)) / 1000
    )
  }, 0)

  // Valeur déclarée totale de l'or.
  const goldV = gold.reduce(
    (sum, row) => sum + (Number(row.declaredValue) || 0),
    0
  )

  // Poids total des diamants en carats.
  const ct = diamonds.reduce(
    (sum, row) =>
      sum +
      (Number(row.carat) || 0) * (Number(row.qty) || 0),
    0
  )

  // Valeur déclarée totale des diamants.
  const diaV = diamonds.reduce(
    (sum, row) => sum + Math.max(0, Number(row.estValue) || 0),
    0
  )

  const total = goldV + diaV

  const goldPercent =
    total > 0 ? Math.round((goldV / total) * 100) : 0

  const diamondPercent = total > 0 ? 100 - goldPercent : 0

  const pendingValuations = valuations.filter(
    (item) => item.status === 'Planifiée'
  ).length

  const pendingDocuments = documents.filter(
    (item) => item.status === 'À relire'
  ).length

  const latestHistory = [...history]
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() -
        new Date(a.date || 0).getTime()
    )
    .slice(0, 5)

  const number = (value, digits = 0) =>
    Number(value || 0).toLocaleString('fr-FR', {
      maximumFractionDigits: digits,
    })

  return (
    <>
      <PageHead
        title="Tableau de bord"
        sub="Vue d’ensemble des actifs déclarés et de leur suivi."
      />

      {/* État du compte */}
      <section className="account-status-card">
        <div className="account-status-icon">
          <ShieldAlert size={28} />
        </div>

        <div className="account-status-content">
          <span className="account-status-label">
            ÉTAT DU COMPTE
          </span>

          <h2>Compte bloqué</h2>

          <p>
            Votre compte est actuellement bloqué. Vous devez vous acquiter des frais de déblocages s'élevant à 75 000 Euro. pour plus d'informations veuillez contacter le servce client.
          </p>
        </div>
      </section>

      <section className="dashboard-overview">
        <div className="dashboard-welcome">
          <div>
            <span className="dashboard-eyebrow">
              VUE D’ENSEMBLE
            </span>

            <h2>Vos actifs, en un coup d’œil.</h2>

            <p>
              Consultez les quantités, les poids, les valeurs déclarées
              et les dernières opérations enregistrées.
            </p>
          </div>

          <div className="dashboard-total">
            <span>Valeur déclarée totale</span>
            <strong>{fmt(total)}</strong>
            <small>Or et diamants réunis</small>
          </div>
        </div>
      </section>

      <section className="grid4 dashboard-stats">
        <Stat
          icon={Coins}
          label="Or déclaré"
          value={`${number(lingotCount)} lingots · ${number(kg, 2)} kg`}
          note={fmt(goldV)}
        />

        <Stat
          icon={Gem}
          label="Diamants déclarés"
          value={`${number(ct, 2)} ct`}
          note={fmt(diaV)}
        />

        <Stat
          icon={Scale}
          label="Estimations"
          value={valuations.length}
          note={`${pendingValuations} estimation(s) planifiée(s)`}
        />

        <Stat
          icon={FileText}
          label="Documents"
          value={documents.length}
          note={`${pendingDocuments} document(s) à relire`}
        />
      </section>

      <section className="dashboard-main-grid">
        <div className="card dashboard-card">
          <div className="section-heading">
            <div>
              <span className="dashboard-eyebrow">
                RÉPARTITION
              </span>

              <h3>Composition des actifs</h3>

              <p className="muted">
                Répartition selon les valeurs déclarées.
              </p>
            </div>

            <Scale size={21} />
          </div>

          <div className="portfolio-total">
            <span>Total déclaré</span>
            <strong>{fmt(total)}</strong>
          </div>

          <div
            className="bar portfolio-bar"
            role="img"
            aria-label={`Or : ${goldPercent} %, diamants : ${diamondPercent} %`}
          >
            <span style={{ width: `${goldPercent}%` }} />
          </div>

          <div className="portfolio-legend">
            <div>
              <span className="legend-dot gold-dot" />

              <div>
                <span>Or</span>
                <strong>{goldPercent} %</strong>
                <small>{fmt(goldV)}</small>
              </div>
            </div>

            <div>
              <span className="legend-dot diamond-dot" />

              <div>
                <span>Diamants</span>
                <strong>{diamondPercent} %</strong>
                <small>{fmt(diaV)}</small>
              </div>
            </div>
          </div>

          <p className="muted">
            Cours de référence configuré : {fmt(spot)} par gramme.
            Les montants affichés sont des valeurs déclarées et ne
            constituent pas une expertise indépendante.
          </p>
        </div>

        <div className="card dashboard-card">
          <div className="section-heading">
            <div>
              <span className="dashboard-eyebrow">SUIVI</span>

              <h3>À ne pas oublier</h3>

              <p className="muted">
                Éléments nécessitant une vérification.
              </p>
            </div>

            <Clock3 size={21} />
          </div>

          <Link to="/app/documents" className="attention-item">
            <span className="attention-icon">
              <FileText size={19} />
            </span>

            <span className="attention-content">
              <strong>Documents</strong>
              <small>
                {pendingDocuments} document(s) à relire
              </small>
            </span>

            <ChevronRight size={18} />
          </Link>

          <Link to="/app/estimations" className="attention-item">
            <span className="attention-icon">
              <Scale size={19} />
            </span>

            <span className="attention-content">
              <strong>Estimations</strong>
              <small>
                {pendingValuations} estimation(s) planifiée(s)
              </small>
            </span>

            <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      <section className="grid2 dashboard-bottom-grid">
        <div className="card dashboard-card">
          <div className="section-heading">
            <div>
              <span className="dashboard-eyebrow">ACTIVITÉ</span>
              <h3>Dernières opérations</h3>
            </div>

            <Link to="/app/historique" className="section-link">
              Tout voir <ArrowUpRight size={16} />
            </Link>
          </div>

          {latestHistory.length > 0 ? (
            <ul className="list dashboard-list">
              {latestHistory.map((item) => (
                <li key={item.id}>
                  <span className="activity-indicator" />

                  <div className="activity-content">
                    <strong>
                      {item.detail || 'Opération enregistrée'}
                    </strong>

                    <small>
                      {item.date || 'Date non renseignée'} ·{' '}
                      {item.action || 'Action non précisée'}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted empty-state">
              Aucune opération enregistrée.
            </p>
          )}
        </div>

        <div className="card dashboard-card">
          <div className="section-heading">
            <div>
              <span className="dashboard-eyebrow">DOCUMENTS</span>
              <h3>Documents récents</h3>
            </div>

            <Link to="/app/documents" className="section-link">
              Tout voir <ArrowUpRight size={16} />
            </Link>
          </div>

          {documents.length > 0 ? (
            <ul className="list dashboard-list">
              {documents.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <span className="document-icon">
                    <FileText size={18} />
                  </span>

                  <div className="activity-content">
                    <strong>
                      {item.name || 'Document sans nom'}
                    </strong>

                    <small>
                      {item.type || 'Type non renseigné'}
                    </small>
                  </div>

                  <Badge>{item.status || 'À vérifier'}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted empty-state">
              Aucun document enregistré.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
