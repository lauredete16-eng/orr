
import { useState } from 'react'
import { Download, FileText } from 'lucide-react'
import { PageHead } from '../components/UI.jsx'

const documentText = `
SUMMARY OF INFORMATION PROVIDED

1. COMPANY INFORMATION

Country: Finland
City: Helsinki
Address provided: Kasarmikatu 21, 00130 Helsinki, Finland

2. ESTATE INFORMATION

Reported name of the deceased: PARK Haneul
Reported date of death: 21/05/2024

Named beneficiary: MARIE PARK
Address provided: 1–2 Ashburn Gardens,
London SW7 4DG, United Kingdom

3. ASSETS MENTIONED

Gold:
Declared quantity: 150 kg
Reported value: €18,070,126.50

Another reported valuation for the gold:
€17,541,528

Red diamonds:
Quantity and description provided:
10 red diamonds, each weighing 1 carat.
A separate entry also mentions 10 kg.
Reported value: €18,000,000

4. FEES MENTIONED

Amount communicated: €75,000
Stated reason: Account unblocking fees.

Note: The information and amounts above have been reproduced
as provided. They have not been independently verified.
Any payment request should be confirmed directly with the
relevant competent authorities.
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
    link.download = 'information-summary.txt'

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(url)
    setMessage('Download started.')
  }

  return (
    <>
      <PageHead
        title="Documents"
        sub="View and download the information summary."
      />

      <section className="card narrow document-download-card">
        <div className="document-download-icon">
          <FileText size={30} />
        </div>

        <div className="document-download-content">
          <h2>Information Summary</h2>

          <p>
            Find the information provided regarding the company,
            the estate, the assets and the amounts mentioned.
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={downloadDocument}
          >
            <Download size={18} />
            Download Document
          </button>

          {message && <p role="status">{message}</p>}
        </div>
      </section>
    </>
  )
}
