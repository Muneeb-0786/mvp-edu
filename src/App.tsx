import { useState } from 'react'
import RecommendationForm, { type StudentProfile } from './components/RecommendationForm'
import RecommendationsList, { type Recommendation } from './components/RecommendationsList'
import './App.css'

function App() {
  const [recs, setRecs] = useState<Recommendation[] | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchRecommendations(profile: StudentProfile) {
    setLoading(true)
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      const data = await res.json()
      setRecs(data.recommendations)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (recs) {
    return <RecommendationsList recommendations={recs} onBack={() => setRecs(null)} />
  }

  return (
    <div className="p-4">
      {loading && <p className="text-center">Loading...</p>}
      <RecommendationForm onSubmit={fetchRecommendations} />
    </div>
  )
}

export default App
