
import { useState } from 'react'
import { Download, FileText } from 'lucide-react'
import { PageHead } from '../components/UI.jsx'

const documentText = `
RÉCAPITULATIF DES INFORMATIONS TRANSMISES

1. INFORMATIONS RELATIVES À LA SOCIÉTÉ

Pays : Finlande
Ville : Helsinki
Adresse communiquée : Kasarmikatu 21, 00130 Helsinki, Finlande

2. INFORMATIONS RELATIVES À LA SUCCESSION

Nom communiqué du défunt : PARK Haneul
Date de décès communiquée : 21/05/2024

Bénéficiaire indiqué : MARIE PARK
Adresse communiquée : 1–2 Ashburn Gardens,
London SW7 4DG, Royaume-Uni

3. BIENS MENTIONNÉS

Or :
Quantité déclarée : 150 kg
Valeur communiquée : 18 070 126,50 €

Une autre estimation communiquée pour l'or :
17 541 528 €

Diamants rouges :
Quantité et description communiquées :
10 diamants rouges de 1 carat chacun.
Une mention distincte indique également 10 kg.
Valeur annoncée : 18 000 000 €

4. FRAIS MENTIONNÉS

Montant communiqué : 75 000 €
Motif annoncé : frais de déblocage.


`

export default function Documents() {
  const [message, setMessage] = useState('')

  const downloadDocument = () => {
    const blob = new Blob([documentText.trim()], {
      type: 'text/plain;charset=utf-8',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'recapitulatif-informations.txt'

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(url)
    setMessage('Téléchargement lancé.')
  }

  return (
    <>
      <PageHead
        title="Documents"
        sub="Consultez et téléchargez le récapitulatif."
      />

      <section className="card narrow document-download-card">
        <div className="document-download-icon">
          <FileText size={30} />
        </div>

        <div className="document-download-content">
          <h2>Récapitulatif des informations</h2>
          <p>
            Retrouvez les informations communiquées concernant
            la société, la succession, les biens et les montants mentionnés.
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={downloadDocument}
          >
            <Download size={18} />
            Télécharger le document
          </button>

          {message && <p role="status">{message}</p>}
        </div>
      </section>
    </>
  )
}
