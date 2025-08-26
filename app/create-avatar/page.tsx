'use client'
import { useState } from 'react'

const genders = ['Woman','Man','Unspecified']
const ages = ['Young Adult','Early Middle Age','Late Middle Age','Senior','Unspecified']
const ethnicities = ['White','Black','Asian American','East Asian','South East Asian','South Asian','Middle Eastern','Pacific','Hispanic','Unspecified']
const orientations = ['vertical','horizontal','square']
const poses = ['full_body','half_body','close_up']
const styles = ['Realistic','Pixar','Cinematic','Vintage','Noir','Cyberpunk','Unspecified']
const scenes = ['Studio','Office','Home','Outdoor','Unspecified']
const voiceGenders = ['Male','Female']

export default function CreateAvatarPage() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    const fd = new FormData(e.currentTarget)
    const payload: Record<string, any> = {
      avatar_name: fd.get('avatar_name') || '',
      gender: fd.get('gender') || '',
      age: fd.get('age') || '',
      ethnicity: fd.get('ethnicity') || '',
      orientation: fd.get('orientation') || '',
      pose: fd.get('pose') || '',
      style: fd.get('style') || '',
      scene: fd.get('scene') || '',
      appearance: fd.get('appearance') || '',
      voice_gender: fd.get('voice_gender') || '',
      voice_id: fd.get('voice_id') || '',
      script_text: fd.get('script_text') || '',
      email: fd.get('email') || ''
    }
    try {
      const res = await fetch('/api/n8n/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        setStatus('success')
        setMessage("Demande envoyée. Vous recevrez un email lorsque c'est prêt.")
        e.currentTarget.reset()
      } else {
        const err = await res.text()
        setStatus('error')
        setMessage(err || "Erreur lors de l'envoi")
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(err?.message || 'Erreur réseau')
    }
  }

  return (
    <main className="container mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Créer un avatar</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input required name="email" type="email" className="w-full border rounded p-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Nom de lavatar</label>
            <input name="avatar_name" type="text" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Genre</label>
            <select name="gender" className="w-full border rounded p-2">
              {genders.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Âge</label>
            <select name="age" className="w-full border rounded p-2">
              {ages.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Ethnicité</label>
            <select name="ethnicity" className="w-full border rounded p-2">
              {ethnicities.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Orientation</label>
            <select name="orientation" className="w-full border rounded p-2">
              {orientations.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Pose</label>
            <select name="pose" className="w-full border rounded p-2">
              {poses.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Style</label>
            <select name="style" className="w-full border rounded p-2">
              {styles.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Scène</label>
            <select name="scene" className="w-full border rounded p-2">
              {scenes.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Apparence (1000 caractères)</label>
          <textarea name="appearance" rows={4} className="w-full border rounded p-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Genre de voix</label>
            <select name="voice_gender" className="w-full border rounded p-2">
              <option value="">Automatique</option>
              {voiceGenders.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Voice ID (optionnel)</label>
            <input name="voice_id" type="text" className="w-full border rounded p-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Script</label>
          <textarea required name="script_text" rows={6} className="w-full border rounded p-2" />
        </div>

        <button type="submit" disabled={status==='loading'} className="px-4 py-2 bg-black text-white rounded">
          {status==='loading' ? 'Envoi' : 'Lancer la génération'}
        </button>
      </form>
      {message ? (
        <p className={mt-4 text-sm }>{message}</p>
      ) : null}
    </main>
  )
}
