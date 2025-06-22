import { useState } from 'react'

export interface StudentProfile {
  name: string
  email: string
  interests: string
  grades: string
  location: string
}

interface Props {
  onSubmit: (profile: StudentProfile) => void
}

export default function RecommendationForm({ onSubmit }: Props) {
  const [form, setForm] = useState<StudentProfile>({
    name: '',
    email: '',
    interests: '',
    grades: '',
    location: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <div>
        <label className="block text-sm font-medium" htmlFor="name">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="interests">
          Academic Interests
        </label>
        <textarea
          id="interests"
          name="interests"
          required
          value={form.interests}
          onChange={handleChange}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="grades">
          Grades
        </label>
        <input
          id="grades"
          name="grades"
          type="text"
          required
          value={form.grades}
          onChange={handleChange}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="location">
          Preferred Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          required
          value={form.location}
          onChange={handleChange}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>
      <button type="submit" className="w-full rounded bg-blue-600 py-2 text-white">
        Get Recommendations
      </button>
    </form>
  )
}
