'use client'

export default function CreateAvatarPage() {
  const src = process.env.NEXT_PUBLIC_N8N_FORM_URL || 'https://georgiee12.app.n8n.cloud/form/cab2808c-90cd-468b-92ce-14e586df6121'
  return (
    <main className="container mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Créer un avatar</h1>
      {!src ? (
        <p className="text-sm text-red-600">NEXT_PUBLIC_N8N_FORM_URL n'est pas défini.</p>
      ) : (
        <iframe
          src={src}
          title="Formulaire n8n"
          className="w-full border rounded"
          style={{ minHeight: '85vh' }}
        />
      )}
    </main>
  )
}

