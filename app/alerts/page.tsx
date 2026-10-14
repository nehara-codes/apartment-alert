import { createClient } from '@/lib/supabase/server'
import NewAlertForm from './new-alert-form'
import DeleteButton from './delete-button'
import EditButton from './edit-button'

export default async function AlertsPage() {
  const supabase = await createClient()

  const { data: alerts, error } = await supabase
    .from('alerts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p>Error loading alerts: {error.message}</p >
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Community Alerts</h1>

      <NewAlertForm />

      {alerts?.length === 0 && (
        <p className="text-gray-500">No alerts yet. Be the first to post one.</p >
      )}

      <ul className="space-y-2">
        {alerts?.map((alert) => (
          <li
            key={alert.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <span>{alert.content}</span>
            <div className="flex items-center">
              <EditButton alertId={alert.id} initialContent={alert.content} />
              <DeleteButton alertId={alert.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}