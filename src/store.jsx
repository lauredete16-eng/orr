
import { createContext, useContext, useEffect, useState } from 'react'
import { CONFIG } from './config.js'
import { seed } from './seed.js'

const Ctx = createContext(null)

export const useStore = () => useContext(Ctx)

export const fmt = (n) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(n) || 0)

export const goldValue = (row, spot) => {
  const weightG = Number(row?.weightG) || 0
  const qty = Number(row?.qty) || 0
  const purity = Number(row?.purity) || 0
  const pricePerGram = Number(spot) || 0

  return weightG * qty * (purity / 1000) * pricePerGram
}

// Storage version
const DATA_KEY = 'orvane-data-v3'
const OLD_DATA_KEY = 'orvane-data-v2'
const SESSION_KEY = 'orvane-session'
const DATA_VERSION = 6

const COLS = ['gold', 'diamonds', 'valuations', 'documents', 'history']

const today = () => new Date().toISOString().slice(0, 10)

const label = (item) =>
  item?.label || item?.name || item?.asset || item?.ref || ''

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

// CONFIG.profile values take priority.
const makeProfile = (profile = {}) => ({
  ...profile,
  ...CONFIG.profile,
  id: CONFIG.id,
  spot: Number(profile.spot ?? seed.profile?.spot) || 0,
})

// Data migration and normalization.
const migrateData = (saved) => {
  const data = { ...seed, ...saved }

  for (const col of COLS) {
    if (!Array.isArray(data[col])) {
      data[col] = Array.isArray(seed[col]) ? [...seed[col]] : []
    }
  }

  // Set the review status of the specified documents.
  data.documents = data.documents.map((doc) => {
    const isTargetDocument = [
      'Documents successoraux de PARK Haneul',
      'Justificatifs de propriété des actifs',
    ].includes(doc.name)

    return isTargetDocument
      ? { ...doc, status: 'Pending review' }
      : doc
  })

  // Set the review status of the specified valuations.
  data.valuations = data.valuations.map((item) => {
    const isTargetValuation =
      ['AU-001', 'DI-001'].includes(item.asset)

    return isTargetValuation
      ? { ...item, status: 'Pending review' }
      : item
  })

  return {
    ...data,
    version: DATA_VERSION,
    profile: makeProfile(data.profile),
  }
}

const makeInitialData = () => {
  // Load the current version if it exists.
  const current = read(DATA_KEY, null)

  if (current && COLS.every((col) => Array.isArray(current[col]))) {
    return migrateData(current)
  }

  // Otherwise, retrieve and migrate the previous version.
  const old = read(OLD_DATA_KEY, null)

  if (old && COLS.every((col) => Array.isArray(old[col]))) {
    return migrateData(old)
  }

  // First installation.
  return migrateData(seed)
}

const emptyData = (profile) => ({
  version: DATA_VERSION,
  gold: [],
  diamonds: [],
  valuations: [],
  documents: [],
  history: [],
  profile: makeProfile(profile),
})

export function StoreProvider({ children }) {
  const [data, setData] = useState(makeInitialData)

  const [auth, setAuth] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  )

  // Save normalized data.
  useEffect(() => {
    try {
      localStorage.setItem(DATA_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Unable to save data:', error)
    }
  }, [data])

  const log = (currentData, action, detail) => ({
    ...currentData,
    history: [
      {
        id: crypto.randomUUID(),
        date: today(),
        action,
        detail,
      },
      ...(Array.isArray(currentData.history)
        ? currentData.history
        : []),
    ],
  })

  const save = (col, item) =>
    setData((currentData) => {
      if (!COLS.includes(col) || col === 'history') {
        return currentData
      }

      const rows = Array.isArray(currentData[col])
        ? currentData[col]
        : []

      const exists =
        item.id && rows.some((entry) => entry.id === item.id)

      const savedItem = exists
        ? item
        : { ...item, id: crypto.randomUUID() }

      const updatedRows = exists
        ? rows.map((entry) =>
            entry.id === savedItem.id ? savedItem : entry
          )
        : [savedItem, ...rows]

      return log(
        { ...currentData, [col]: updatedRows },
        exists ? 'Modification' : 'Creation',
        label(savedItem)
      )
    })

  const remove = (col, id) =>
    setData((currentData) => {
      if (!COLS.includes(col) || col === 'history') {
        return currentData
      }

      const rows = Array.isArray(currentData[col])
        ? currentData[col]
        : []

      const item = rows.find((entry) => entry.id === id)

      return log(
        {
          ...currentData,
          [col]: rows.filter((entry) => entry.id !== id),
        },
        'Deletion',
        label(item)
      )
    })

  const setProfile = (profile) =>
    setData((currentData) =>
      log(
        {
          ...currentData,
          profile: makeProfile({
            ...currentData.profile,
            ...profile,
          }),
        },
        'Profile',
        'Profile updated'
      )
    )

  const login = (id, password) => {
    if (id !== CONFIG.id || password !== CONFIG.password) {
      return 'Incorrect user ID or password.'
    }

    sessionStorage.setItem(SESSION_KEY, '1')
    setAuth(true)
    return null
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuth(false)
  }

  const exportData = () => {
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: 'application/json' }
    )

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `orvane-backup-${today()}.json`

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(url)
  }

  const importData = async (file) => {
    try {
      const imported = JSON.parse(await file.text())

      if (!COLS.every((col) => Array.isArray(imported[col]))) {
        return 'Invalid backup file.'
      }

      const importedData = migrateData({
        ...emptyData(imported.profile),
        ...imported,
      })

      setData(
        log(importedData, 'Import', 'Backup imported')
      )

      return null
    } catch {
      return 'Unable to read the file.'
    }
  }

  const clearData = () => {
    setData(emptyData(data.profile))
  }

  return (
    <Ctx.Provider
      value={{
        data,
        auth,
        ready: true,
        save,
        remove,
        setProfile,
        login,
        logout,
        exportData,
        importData,
        clearData,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}
