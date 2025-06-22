import express from 'express'
import { Pool } from 'pg'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')

const app = express();
app.use(express.json());

app.post('/api/recommendations', async (req, res) => {
  const { name, email, interests, grades, location } = req.body;
  try {
    await pool.query(
      'INSERT INTO student_profiles(name, email, interests, grades, location) VALUES($1,$2,$3,$4,$5)',
      [name, email, interests, grades, location]
    )

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = `Name: ${name}\nInterests: ${interests}\nGrades: ${grades}\nLocation: ${location}\nProvide up to three recommendations as a JSON array in the form [{"university":"","program":"","reason":""}]`
    const result = await model.generateContent(prompt)
    const aiText = result.response.text()

    let recommendations
    try {
      recommendations = JSON.parse(aiText ?? '[]')
    } catch {
      recommendations = [
        {
          university: 'Example University',
          program: 'Computer Science',
          reason: 'AI response format invalid',
        },
      ]
    }

    res.json({ recommendations })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
