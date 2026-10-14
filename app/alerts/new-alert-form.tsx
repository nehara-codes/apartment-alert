'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewAlertForm() {
  const [content, setContent] = useState('')
  const supabase = createClient()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert('You must be logged in')
      return
    }

    const { error } = await supabase
      .from('alerts')
      .insert({ content, user_id: user.id })

    if (error) {
      alert('Error: ' + error.message)
    } else {
      setContent('')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post an alert (e.g., water shutoff tomorrow)"
        className="border p-2 w-full rounded"
        required
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post Alert
      </button>
    </form>
  )
}