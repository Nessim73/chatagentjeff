import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const url = process.env.N8N_WEBHOOK_URL
  if (!url) return NextResponse.json({ error: 'N8N_WEBHOOK_URL non défini' }, { status: 500 })
  let json: any = {}
  try { json = await req.json() } catch {}
  const params = new URLSearchParams()
  Object.entries(json || {}).forEach(([k, v]) => params.append(k, String(v ?? '')))
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  })
  const text = await res.text()
  try { return NextResponse.json(JSON.parse(text), { status: res.status }) }
  catch { return new NextResponse(text, { status: res.status }) }
}
