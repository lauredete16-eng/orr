
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

  // Total number of gold bars.
  const lingotCount = gold.reduce(
    (sum, row) => sum + (Number(row.qty) || 0),
    0
  )

  // Total weight in kilograms.
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

  // Total declared value of gold.
  const goldV = gold.reduce(
    (sum, row) => sum + (Number(row.declaredValue) || 0),
    0
  )

  // Total diamond weight in carats.
  const ct = diamonds.reduce(
    (sum, row) =>
      sum +
      (Number(row.carat) || 0) * (Number(row.qty) || 0),
    0
  )

  // Total declared value of diamonds.
  const diaV = diamonds.reduce(
    (sum, row) => sum + Math.max(0, Number(row.estValue) || 0),
    0
  )

  const total = goldV + diaV

  const goldPercent =
    total > 0 ? Math.round((goldV / total) * 100) : 0

  const diamondPercent = total > 0 ? 100 - goldPercent : 0

  const pendingValuations = valuations.filter(
    (item) => item.status === 'Scheduled'
  ).length

  const pendingDocuments = documents.filter(
    (item) => item.status === 'Needs review'
  ).length

  const latestHistory = [...history]
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() -
        new Date(a.date || 0).getTime()
    )
    .slice(0, 5)

  const number = (value, digits = 0) =>
    Number(value || 0).toLocaleString('en-US', {
      maximumFractionDigits: digits,
    })

  return (
    <>
      <PageHead
        title="Dashboard"
        sub="Overview of declared assets and their tracking."
      />

      {/* Account status */}
      <section className="account-status-card">
        <div className="account-status-icon">
          <ShieldAlert size={28} />
        </div>

        <div className="account-status-content">
          <span className="account-status-label">
            ACCOUNT STATUS
          </span>

          <h2>Account blocked</h2>

          <p>
            Your account is currently blocked. A fee of €75,000
            is being requested to unblock it. Please contact
            customer support for further information and
            independently verify any payment request before
            making a payment.
          </p>
        </div>
      </section>

      <section className="dashboard-overview">
        <div className="dashboard-welcome">
          <div>
            <span className="dashboard-eyebrow">
              OVERVIEW
            </span>

            <h2>Your assets at a glance.</h2>

            <p>
              View quantities, weights, declared values
              and the latest recorded transactions.
            </p>
          </div>

          <div className="dashboard-total">
            <span>Total declared value</span>
            <strong>{fmt(total)}</strong>
            <small>Gold and diamonds combined</small>
          </div>
        </div>
      </section>

      <section className="grid4 dashboard-stats">
        <Stat
          icon={Coins}
          label="Declared gold"
          value={`${number(lingotCount)} bars · ${number(kg, 2)} kg`}
          note={fmt(goldV)}
        />

        <Stat
          icon={Gem}
          label="Declared diamonds"
          value={`${number(ct, 2)} ct`}
          note={fmt(diaV)}
        />

        <Stat
          icon={Scale}
          label="Valuations"
          value={valuations.length}
          note={`${pendingValuations} scheduled valuation(s)`}
        />

        <Stat
          icon={FileText}
          label="Documents"
          value={documents.length}
          note={`${pendingDocuments} document(s) requiring review`}
        />
      </section>

      <section className="dashboard-main-grid">
        <div className="card dashboard-card">
          <div className="section-heading">
            <div>
              <span className="dashboard-eyebrow">
                BREAKDOWN
              </span>

              <h3>Asset composition</h3>

              <p className="muted">
                Breakdown based on declared values.
              </p>
            </div>

            <Scale size={21} />
          </div>

          <div className="portfolio-total">
            <span>Total declared value</span>
            <strong>{fmt(total)}</strong>
          </div>

          <div
            className="bar portfolio-bar"
            role="img"
            aria-label={`Gold: ${goldPercent}%, diamonds: ${diamondPercent}%`}
          >
            <span style={{ width: `${goldPercent}%` }} />
          </div>

          <div className="portfolio-legend">
            <div>
              <span className="legend-dot gold-dot" />

              <div>
                <span>Gold</span>
                <strong>{goldPercent} %</strong>
                <small>{fmt(goldV)}</small>
              </div>
            </div>

            <div>
              <span className="legend-dot diamond-dot" />

              <div>
                <span>Diamonds</span>
                <strong>{diamondPercent} %</strong>
                <small>{fmt(diaV)}</small>
              </div>
            </div>
          </div>

          
        </div>

        <div className="card dashboard-card">
          <div className="section-heading">
            <div>
              <span className="dashboard-eyebrow">TRACKING</span>

              <h3>Items to follow up</h3>

              <p className="muted">
                Items requiring review.
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
                {pendingDocuments} document(s) requiring review
              </small>
            </span>

            <ChevronRight size={18} />
          </Link>

          <Link to="/app/estimations" className="attention-item">
            <span className="attention-icon">
              <Scale size={19} />
            </span>

            <span className="attention-content">
              <strong>Valuations</strong>
              <small>
                {pendingValuations} scheduled valuation(s)
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
              <span className="dashboard-eyebrow">ACTIVITY</span>
              <h3>Recent transactions</h3>
            </div>

            <Link to="/app/historique" className="section-link">
              View all <ArrowUpRight size={16} />
            </Link>
          </div>

          {latestHistory.length > 0 ? (
            <ul className="list dashboard-list">
              {latestHistory.map((item) => (
                <li key={item.id}>
                  <span className="activity-indicator" />

                  <div className="activity-content">
                    <strong>
                      {item.detail || 'Recorded transaction'}
                    </strong>

                    <small>
                      {item.date || 'Date not provided'} ·{' '}
                      {item.action || 'Action not specified'}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted empty-state">
              No transactions recorded.
            </p>
          )}
        </div>

        <div className="card dashboard-card">
          <div className="section-heading">
            <div>
              <span className="dashboard-eyebrow">DOCUMENTS</span>
              <h3>Recent documents</h3>
            </div>

            <Link to="/app/documents" className="section-link">
              View all <ArrowUpRight size={16} />
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
                      {item.name || 'Unnamed document'}
                    </strong>

                    <small>
                      {item.type || 'Type not provided'}
                    </small>
                  </div>

                  <Badge>{item.status || 'Pending review'}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted empty-state">
              No documents recorded.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
