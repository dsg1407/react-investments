/* eslint-disable react/prop-types */
import { reports } from '../api/investments-2023-8A-pos.json'

export default function InvestmentSection({ investmentId, investmentName }) {
  const investmentReports = reports
    .filter((report) => report.investmentId === investmentId)
    .sort((a, b) => a.month - b.month)
    .map((report, i, array) => {
      return {
        ...report,
        variation: array[i - 1]
          ? reportVariation(array[i - 1].value, report.value)
          : 0,
      }
    })

  const investmentProfit =
    investmentReports[investmentReports.length - 1].value -
    investmentReports[0].value

  const investmentProfitVariation =
    investmentReports[investmentReports.length - 1].value /
      investmentReports[0].value -
    1

  function reportVariation(a, b) {
    return b / a - 1
  }

  return (
    <section className="flex flex-col items-center gap-3 p-5 border rounded-md w-full max-w-5xl">
      <h2 className="text-xl font-bold">{investmentName}</h2>
      <p className="font-bold text-base">
        Rendimento Total:
        <span
          className={
            investmentProfit < 0 ? 'ml-1 text-red-500' : 'ml-1 text-emerald-500'
          }
        >
          {investmentProfit.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
          (
          {investmentProfitVariation.toLocaleString('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          )
        </span>
      </p>
      <div className="flex flex-col gap-1 w-full">
        {investmentReports.map((report) => {
          return (
            <div
              key={report.id}
              className="flex items-center justify-between py-2 border-b"
            >
              <p>
                {report.month}/{report.year}
              </p>
              <p
                className={
                  report.variation < 0 ? 'text-red-500' : 'text-emerald-500'
                }
              >
                {report.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <p
                className={
                  report.variation < 0 ? 'text-red-500' : 'text-emerald-500'
                }
              >
                {report.variation.toLocaleString('pt-BR', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
