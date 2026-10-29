
import { useStore } from '../store.jsx'
import { PageHead } from '../components/UI.jsx'

export default function Profile() {
  const { data } = useStore()
  const profile = data.profile

  return (
    <>
      <PageHead
        title="Profil"
        sub="Informations du titulaire du compte."
      />

      <section className="card narrow profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {(profile.name || 'U').charAt(0).toUpperCase()}
          </div>

          <div>
            <span className="dashboard-eyebrow">
              INFORMATIONS DU COMPTE
            </span>
            <h2>{profile.name || 'Non renseigné'}</h2>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <span>ID du compte</span>
            <strong>{profile.id || 'Non renseigné'}</strong>
          </div>

          <div className="profile-field">
            <span>Nom complet</span>
            <strong>{profile.name || 'Non renseigné'}</strong>
          </div>

          <div className="profile-field">
            <span>Pays</span>
            <strong>{profile.country || 'Non renseigné'}</strong>
          </div>

          <div className="profile-field">
            <span>Ville</span>
            <strong>{profile.city || 'Non renseigné'}</strong>
          </div>

          <div className="profile-field">
            <span>Numéro de téléphone</span>
            <strong>{profile.phone || 'Non renseigné'}</strong>
          </div>
        </div>
      </section>
    </>
  )
}
