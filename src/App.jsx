import InvestmentSection from './components/InvestmentSection'

import { investments } from './api/investments-2023-8A-pos.json'

export function App() {
  return (
    <>
      <header className="flex items-center justify-center p-5 bg-emerald-400">
        <h1 className="text-3xl font-bold">react-investments</h1>
      </header>

      <main className="flex flex-col gap-3 items-center mt-4">
        {investments.map((investment) => {
          return (
            <InvestmentSection
              key={investment.id}
              investmentId={investment.id}
              investmentName={investment.description}
            />
          )
        })}
      </main>
    </>
  )
}
