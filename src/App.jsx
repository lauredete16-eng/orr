import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Gold from './pages/Gold.jsx'
import Diamonds from './pages/Diamonds.jsx'
import Valuations from './pages/Valuations.jsx'
import Documents from './pages/Documents.jsx'
import History from './pages/History.jsx'
import Profile from './pages/Profile.jsx'
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="or" element={<Gold />} />
        <Route path="diamants" element={<Diamonds />} />
        <Route path="estimations" element={<Valuations />} />
        <Route path="documents" element={<Documents />} />
        <Route path="historique" element={<History />} />
        <Route path="profil" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
