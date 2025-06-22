export interface Recommendation {
  university: string
  program: string
  reason: string
}

interface Props {
  recommendations: Recommendation[]
  onBack: () => void
}

export default function RecommendationsList({ recommendations, onBack }: Props) {
  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      <h2 className="text-xl font-semibold text-center">Recommendations</h2>
      <ul className="space-y-4">
        {recommendations.map((rec, idx) => (
          <li key={idx} className="rounded border p-4">
            <p className="font-medium">
              {rec.university} - {rec.program}
            </p>
            <p className="text-sm text-gray-700">{rec.reason}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={onBack}
        className="mt-4 w-full rounded bg-gray-200 py-2 font-medium"
      >
        Back
      </button>
    </div>
  )
}
