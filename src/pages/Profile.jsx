
import { useStore } from '../store.jsx'
import { PageHead } from '../components/UI.jsx'

export default function Profile() {
  const { data } = useStore()
  const profile = data.profile

  return (
    <>
      <PageHead
        title="Profile"
        sub="Account holder information."
      />

      <section className="card narrow profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {(profile.name || 'U').charAt(0).toUpperCase()}
          </div>

          <div>
            <span className="dashboard-eyebrow">
              ACCOUNT INFORMATION
            </span>
            <h2>{profile.name || 'Not provided'}</h2>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <span>Account ID</span>
            <strong>{profile.id || 'Not provided'}</strong>
          </div>

          <div className="profile-field">
            <span>Full Name</span>
            <strong>{profile.name || 'Not provided'}</strong>
          </div>

          <div className="profile-field">
            <span>Country</span>
            <strong>{profile.country || 'Not provided'}</strong>
          </div>

          <div className="profile-field">
            <span>City</span>
            <strong>{profile.city || 'Not provided'}</strong>
          </div>

          <div className="profile-field">
            <span>Phone Number</span>
            <strong>{profile.phone || 'Not provided'}</strong>
          </div>
        </div>
      </section>
    </>
  )
}
