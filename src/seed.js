
export const seed = {
  profile: {
    name: 'MARIE PARK',
    email: '',
    org: 'ORVANE',
    country: 'Finlande',
    city: 'Helsinki',
    address: 'Kasarmikatu 21, 00130 Helsinki, Finlande',
    spot: 62,
  },

  inheritance: {
    deceasedName: 'PARK Haneul',
    declaredDeathDate: '2024-05-21',
    beneficiaryName: 'MARIE PARK',
    beneficiaryAddress:
      '1–2 Ashburn Gardens, London SW7 4DG, Royaume-Uni',
    beneficiaryCity: 'Londres',
    beneficiaryCountry: 'Royaume-Uni',
    status: 'À vérifier',
  },

  gold: [
    {
      id: 1,
      ref: 'AU-001',
      label: 'Lingots d’or',
      weightG: 1000,
      purity: 999.9,
      qty: 150,
      location: 'Lieu de conservation à confirmer',
      declaredTotalWeightKg: 150,
      declaredValue: 18070126.5,
      status: 'Valeur déclarée ',
    },
  ],

  diamonds: [
    {
      id: 1,
      ref: 'DI-001',
      label: 'Diamant rouge naturel Argyle Phoenix',
      carat: 1,
      qty: 10,
      declaredTotalWeightKg: 0,
      estValue: 18000000,
      status: 'Valeur déclarée',
    },
  ],

  valuations: [
    {
      id: 1,
      asset: 'AU-001',
      date: null,
      expert: 'Expert à confirmer',
      amount: 17541528,
      status: 'Évaluation vérifiée',
    },
    {
      id: 2,
      asset: 'DI-001',
      date: null,
      expert: 'Expert à confirmer',
      amount: 18000000,
      status: 'Évaluation vérifiée',
    },
  ],

  documents: [
    {
      id: 1,
      name: 'Documents successoraux de PARK Haneul',
      type: 'Succession',
      date: null,
      status: 'Vérifier',
    },
    {
      id: 2,
      name: 'Justificatifs de propriété des actifs',
      type: 'Justificatif',
      date: null,
      status: 'Fournir',
    },
  ],

  history: [
    {
      id: 'history-initial',
      date: new Date().toISOString().slice(0, 10),
      action: 'Initialisation',
      detail: 'Chargement des données initiales de l’application',
    },
  ],
}
