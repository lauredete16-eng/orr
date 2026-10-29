// Données ENTIÈREMENT FICTIVES — aucun actif, nom ou document réel.
export const seed = {
  profile: { name: 'Camille Exemple', email: 'demo@orvane.test', org: 'Société Démo SA', spot: 62 },
  gold: [
    { id: 1, ref: 'DEMO-AU-001', label: 'Lingot 1 kg', weightG: 1000, purity: 999.9, qty: 4, location: 'Coffre fictif A', status: 'Vérifié (démo)' },
    { id: 2, ref: 'DEMO-AU-002', label: 'Lingot 500 g', weightG: 500, purity: 999.9, qty: 6, location: 'Coffre fictif A', status: 'Vérifié (démo)' },
    { id: 3, ref: 'DEMO-AU-003', label: 'Lingot 100 g', weightG: 100, purity: 999.9, qty: 20, location: 'Coffre fictif B', status: 'En attente' },
    { id: 4, ref: 'DEMO-AU-004', label: 'Pièce 31,1 g', weightG: 31.1, purity: 999, qty: 50, location: 'Coffre fictif B', status: 'Vérifié (démo)' },
  ],
  diamonds: [
    { id: 1, ref: 'DEMO-DI-001', label: 'Brillant rond', carat: 1.2, color: 'D', clarity: 'VVS1', cut: 'Excellent', qty: 2, estValue: 14000, status: 'Vérifié (démo)' },
    { id: 2, ref: 'DEMO-DI-002', label: 'Taille princesse', carat: 0.9, color: 'F', clarity: 'VS1', cut: 'Très bon', qty: 4, estValue: 6200, status: 'En attente' },
    { id: 3, ref: 'DEMO-DI-003', label: 'Taille émeraude', carat: 2.0, color: 'G', clarity: 'VS2', cut: 'Très bon', qty: 1, estValue: 21000, status: 'Vérifié (démo)' },
  ],
  valuations: [
    { id: 1, asset: 'DEMO-AU-001', date: '2026-09-12', expert: 'Cabinet Exemple (fictif)', amount: 248000, status: 'Terminée' },
    { id: 2, asset: 'DEMO-DI-003', date: '2026-09-28', expert: 'Laboratoire Modèle (fictif)', amount: 21500, status: 'Terminée' },
    { id: 3, asset: 'DEMO-DI-002', date: '2026-10-20', expert: 'Laboratoire Modèle (fictif)', amount: 6000, status: 'Planifiée' },
  ],
  documents: [
    { id: 1, name: 'Certificat d’authenticité — lingots 1 kg', type: 'Certificat', date: '2026-09-12', status: 'Validé (démo)' },
    { id: 2, name: 'Rapport de gradation — DEMO-DI-003', type: 'Rapport', date: '2026-09-28', status: 'Validé (démo)' },
    { id: 3, name: 'Contrat de garde de coffre', type: 'Contrat', date: '2026-08-02', status: 'À relire' },
  ],
  history: [
    { id: 3, date: '2026-10-20', action: 'Création', detail: 'Estimation planifiée : DEMO-DI-002' },
    { id: 2, date: '2026-09-28', action: 'Modification', detail: 'Rapport de gradation ajouté' },
    { id: 1, date: '2026-09-12', action: 'Création', detail: 'Lingots 1 kg enregistrés' },
  ],
}
