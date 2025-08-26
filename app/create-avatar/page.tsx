'use client'
import { useState } from 'react'

export default function CreateAvatarPage() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      email: fd.get('email'),
      text: fd.get('text'),
      voice_gender: fd.get('voice_gender') || '',
      avatar: { name: fd.get('name') || '' }
    }
    try {
      const res = await fetch('/api/n8n/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        setStatus('success')
        setMessage('Demande envoyée. Vous recevrez un email quand c\'est prêt.')
        form.reset()
      } else {
        const err = await res.text()
        setStatus('error')
        setMessage(err || 'Erreur lors de l\'envoi')
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(err?.message || 'Erreur réseau')
    }
  }

  return (
    <main className="container mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Créer un avatar</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input required name="email" type="email" className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Nom de lavatar</label>
          <input name="name" type="text" className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Genre de voix</label>
          <select name="voice_gender" className="w-full border rounded p-2">
            <option value="">Automatique</option>
            <option value="Male">Masculin</option>
            <option value="Female">Féminin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Script</label>
          <textarea required name="text" rows={6} className="w-full border rounded p-2" />
        </div>
        <button type="submit" disabled={status==='loading'} className="px-4 py-2 bg-black text-white rounded">
          {status==='loading' ? 'Envoi...' : 'Lancer la génération'}
        </button>
      </form>
      {message ? (
        <p className={mt-4 text-sm }>{message}</p>
      ) : null}
    </main>
  )
}
