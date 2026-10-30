
export const seed = {
  profile: {
    name: 'MARIE PARK',
    email: '',
    org: 'ORVANE',
    country: 'Finland',
    city: 'Helsinki',
    address: 'Kasarmikatu 21, 00130 Helsinki, Finland',
    spot: 62,
  },

  inheritance: {
    deceasedName: 'PARK Haneul',
    declaredDeathDate: '2024-05-21',
    beneficiaryName: 'MARIE PARK',
    beneficiaryAddress:
      '1–2 Ashburn Gardens, London SW7 4DG, United Kingdom',
    beneficiaryCity: 'London',
    beneficiaryCountry: 'United Kingdom',
    status: 'Pending verification',
  },

  gold: [
    {
      id: 1,
      ref: 'AU-001',
      label: 'Gold bars',
      weightG: 1000,
      purity: 999.9,
      qty: 150,
      location: 'Storage location to be confirmed',
      declaredTotalWeightKg: 150,
      declaredValue: 18070126.5,
      status: 'Declared value',
    },
  ],

  diamonds: [
    {
      id: 1,
      ref: 'DI-001',
      label: 'Natural Argyle Phoenix red diamond',
      carat: 1,
      qty: 10,
      declaredTotalWeightKg: 0,
      estValue: 18000000,
      status: 'Declared value',
    },
  ],

  valuations: [
    {
      id: 1,
      asset: 'AU-001',
      date: null,
      expert: 'Appraiser to be confirmed',
      amount: 17541528,
      status: 'Pending verification',
    },
    {
      id: 2,
      asset: 'DI-001',
      date: null,
      expert: 'Appraiser to be confirmed',
      amount: 18000000,
      status: 'Pending verification',
    },
  ],

  documents: [
    {
      id: 1,
      name: 'Estate documents relating to PARK Haneul',
      type: 'Inheritance',
      date: null,
      status: 'Pending review',
    },
    {
      id: 2,
      name: 'Proof of ownership of the assets',
      type: 'Supporting document',
      date: null,
      status: 'Required',
    },
  ],

  history: [
    {
      id: 'history-initial',
      date: new Date().toISOString().slice(0, 10),
      action: 'Initialization',
      detail: 'Loading the application initial data',
    },
  ],
}
