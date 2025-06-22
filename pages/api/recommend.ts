import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, interests, grades, location } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not set' });
  }

  const prompt = `A student is exploring university options. Here is their profile:

Name: ${name}

Interests: ${interests}

Grades: ${grades}

Preferred Country or Region: ${location}

Available programs:

Harvard: CS, Business, Psychology

MIT: AI, Mechanical Engineering, Data Science

Stanford: Biology, Economics, CS

Please recommend 3 programs from these universities and explain why each program is a good fit.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: errorText });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const recommendations = text
      .split('\n')
      .map((line: string) => line.trim())
      .filter(Boolean)
      .map((line: string) => {
        const match = line.match(/^\d+\.\s*(.+?)\s*-\s*(.+?):\s*(.+)$/);
        if (match) {
          return { program: match[1], university: match[2], reason: match[3] };
        }
        return null;
      })
      .filter(Boolean);

    return res.status(200).json({ recommendations });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Unknown error' });
  }
}
