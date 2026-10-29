
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '../store.jsx'

const digits = (v, n) => v.replace(/\D/g, '').slice(0, n)

export default function Login() {
  const { login } = useStore()
  const nav = useNavigate()

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const m = login(id, pw)
    m ? setErr(m) : nav('/app')
  }

  return (
    <div className="public">
      <form className="card login form" onSubmit={submit}>
        <Link to="/" className="login-brand">
          <img
            src="image/L1.jpeg"
            alt="Logo Voima Gold"
            className="login-logo"
          />
          <span className="brand dark">Voima Gold</span>
        </Link>

        <h1>Connexion</h1>

        <label>
          Identifiant
          <input
            inputMode="numeric"
            autoComplete="username"
            maxLength={10}
            value={id}
            onChange={(e) => setId(digits(e.target.value, 10))}
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            maxLength={6}
            value={pw}
            onChange={(e) => setPw(digits(e.target.value, 6))}
          />
        </label>

        {err && (
          <p className="error" role="alert">
            {err}
          </p>
        )}

        <button className="btn" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  )
}
