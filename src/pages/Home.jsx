
import { Link } from 'react-router-dom'
import { ShieldCheck, Gem, FileText, Scale } from 'lucide-react'

const feats = [
  [
    Gem,
    'Detailed Inventory',
    'Gold bars, coins and gemstones with reference, purity, weight and location.',
  ],
  [
    Scale,
    'Tracked Valuations',
    'Keep track of every appraisal, including its author, date and amount.',
  ],
  [
    FileText,
    'Organized Documents',
    'Certificates, reports and contracts in one place, with their status.',
  ],
  [
    ShieldCheck,
    'Complete History',
    'Every addition, modification or deletion is timestamped.',
  ],
]

export default function Home() {
  return (
    <div className="public">
      <header className="pubtop">
        <Link to="/" className="home-brand">
          <span className="brand dark">Voima Gold</span>
        </Link>

        <Link className="btn" to="/connexion">
          Log In
        </Link>
      </header>

      <section className="hero">
        <img
          src="image/L1.jpeg"
          alt="Voima Gold Logo"
          className="hero-logo"
        />

        <h1>
          Your valuable assets, inventoried with the precision of a secure vault.
        </h1>

        <p>
          Voima Gold allows you to track your gold, diamonds,
          their valuations and supporting documents. Your data is
          stored on this device.
        </p>

        <Link className="btn" to="/connexion">
          Access My Account
        </Link>
      </section>

      <section className="grid4">
        {feats.map(([Icon, title, description]) => (
          <div className="card" key={title}>
            <Icon size={22} />
            <h3>{title}</h3>
            <p className="muted">{description}</p>
          </div>
        ))}
      </section>

      <footer className="foot muted">
        Voima Gold.
      </footer>
    </div>
  )
}
