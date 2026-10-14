'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditButton({
  alertId,
  initialContent,
}: {
  alertId: number
  initialContent: string
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(initialContent)
  const supabase = createClient()
  const router = useRouter()

  async function handleSave() {
    const { error } = await supabase
      .from('alerts')
      .update({ content })
      .eq('id', alertId)

    if (error) {
      alert('Error: ' + error.message)
    } else {
      setIsEditing(false)
      router.refresh()
    }
  }

  if (isEditing) {
    return (
      <div className="flex gap-2 items-center">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-1 rounded"
        />
        <button onClick={handleSave} className="text-green-600 text-sm">
          Save
        </button>
        <button
          onClick={() => {
            setIsEditing(false)
            setContent(initialContent)
          }}
          className="text-gray-500 text-sm"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="text-blue-500 text-sm ml-2"
    >
      Edit
    </button>
  )
}