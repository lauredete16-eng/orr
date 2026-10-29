
import { Link } from 'react-router-dom'
import { ShieldCheck, Gem, FileText, Scale } from 'lucide-react'

const feats = [
  [
    Gem,
    'Inventaire précis',
    'Lingots, pièces et pierres avec référence, pureté, poids et emplacement.',
  ],
  [
    Scale,
    'Estimations suivies',
    'Gardez chaque expertise, son auteur, sa date et son montant.',
  ],
  [
    FileText,
    'Documents classés',
    'Certificats, rapports et contrats au même endroit, avec leur statut.',
  ],
  [
    ShieldCheck,
    'Historique complet',
    'Chaque ajout, modification ou suppression est daté.',
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
          Se connecter
        </Link>
      </header>

      <section className="hero">
        <img
          src="image/L1.jpeg"
          alt="Logo Voima Gold"
          className="hero-logo"
        />

        <h1>
          Vos actifs précieux, inventoriés avec la rigueur d’un coffre.
        </h1>

        <p>
          Voima Gold vous permet de suivre votre or, vos diamants,
          leurs estimations et leurs justificatifs. Vos données sont
          enregistrées sur cet appareil.
        </p>

        <Link className="btn" to="/connexion">
          Accéder à mon espace
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
