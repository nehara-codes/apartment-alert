'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function DeleteButton({ alertId }: { alertId: number }) {
  const supabase = createClient()
  const router = useRouter()

  async function handleDelete() {
    const { error } = await supabase
      .from('alerts')
      .delete()
      .eq('id', alertId)

    if (error) {
      alert('Error: ' + error.message)
    } else {
      router.refresh()
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 text-sm ml-2"
    >
      Delete
    </button>
  )
}