import { useState } from 'react';

interface Recommendation {
  program: string;
  university: string;
  reason: string;
}

export default function Home() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState('');
  const [grades, setGrades] = useState('');
  const [location, setLocation] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations([]);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          interests,
          grades,
          location,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await res.json();
      setRecommendations(data.recommendations ?? []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Student Placement Assistant</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Academic Interests</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Grades (GPA or %)</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={grades}
              onChange={(e) => setGrades(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Region/Country</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Recommendations'}
          </button>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {recommendations.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
            <ul className="space-y-2">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="border rounded p-2">
                  <p className="font-medium">
                    {rec.program} - {rec.university}
                  </p>
                  <p className="text-sm text-gray-700">{rec.reason}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
