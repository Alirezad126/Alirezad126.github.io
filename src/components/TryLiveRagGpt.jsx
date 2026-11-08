import { useEffect, useRef, useState } from 'react'
import { FileUp, Loader2, Send, Trash2, X, Zap } from 'lucide-react'

const ENDPOINT = (import.meta.env.VITE_RAG_API_URL ?? '').replace(/\/$/, '')

// The function URL caps a request at 6MB and the body arrives base64-encoded,
// so the backend rejects anything over 4MB. Catch it here to save the round trip.
const MAX_BYTES = 4 * 1024 * 1024

const FALLBACK_MODELS = [
  { id: 'openai/gpt-oss-20b', label: 'GPT-OSS 20B', detail: 'Quickest' },
  { id: 'openai/gpt-oss-120b', label: 'GPT-OSS 120B', detail: 'Strongest' },
  { id: 'qwen/qwen3-32b', label: 'Qwen3 32B', detail: 'Technical text' }
]

function Bubble({ turn }) {
  const mine = turn.type === 'user'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <p
        className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-6 ${
          mine
            ? 'bg-accent font-medium text-ink'
            : 'border border-line bg-black/20 text-muted'
        }`}
      >
        {turn.message}
      </p>
    </div>
  )
}

export default function TryLiveRagGpt() {
  const [open, setOpen] = useState(false)
  const [models, setModels] = useState(FALLBACK_MODELS)
  const [model, setModel] = useState(FALLBACK_MODELS[0].id)
  const [session, setSession] = useState(null)
  const [turns, setTurns] = useState([])
  const [question, setQuestion] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const closeRef = useRef(null)
  const transcriptRef = useRef(null)

  // The allowlist lives in the backend, so the picker reads it from there and
  // only falls back to the hardcoded list if the call fails.
  useEffect(() => {
    if (!open || !ENDPOINT) return
    let cancelled = false
    fetch(`${ENDPOINT}/models`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (cancelled || !data.models?.length) return
        setModels(data.models)
        setModel(data.default ?? data.models[0].id)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [turns])

  async function call(path, options) {
    if (!ENDPOINT) throw new Error('No endpoint configured yet.')
    const response = await fetch(`${ENDPOINT}${path}`, options)
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('The free tier is rate limited. Try again in a minute.')
      }
      throw new Error(data.detail ?? `Request failed (${response.status})`)
    }
    return data
  }

  async function upload(file) {
    if (!file) return
    setError(null)
    if (file.size > MAX_BYTES) {
      setError('That PDF is over 4MB, which is the upload limit for this demo.')
      return
    }
    setStatus('uploading')
    try {
      const body = new FormData()
      body.append('file', file)
      const data = await call('/upload', { method: 'POST', body })
      setSession({ id: data.session_id, chunks: data.chunks, name: file.name })
      setTurns([])
      setStatus('idle')
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  async function ask(event) {
    event.preventDefault()
    const message = question.trim()
    if (!message || !session) return

    const history = turns
    setTurns([...history, { type: 'user', message }])
    setQuestion('')
    setStatus('thinking')
    setError(null)
    try {
      const data = await call('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          // The backend rewrites follow-ups into standalone questions from this.
          conversationState: history.map((turn, index) => ({ ...turn, id: index })),
          session_id: session.id,
          model
        })
      })
      setTurns((current) => [...current, { type: 'ai', message: data.AIResponse }])
    } catch (err) {
      setError(err.message)
      setTurns(history)
      setQuestion(message)
    } finally {
      setStatus('idle')
    }
  }

  async function endSession() {
    const id = session?.id
    setSession(null)
    setTurns([])
    setError(null)
    if (!id) return
    try {
      await call('/end_session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: id })
      })
    } catch {
      // The bucket expires sessions after a day anyway.
    }
  }

  const busy = status !== 'idle'

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-primary focus-ring">
        <Zap size={18} />
        Try it live
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={(event) => event.target === event.currentTarget && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Chat with a document"
            className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-y-auto rounded-xl border border-line bg-card p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Live demo</p>
                <h2 className="mt-2 text-xl font-semibold text-heading">
                  Chat with your own PDF
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="focus-ring rounded-lg border border-line p-2 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <X size={18} />
              </button>
            </div>

            {!session ? (
              <>
                <p className="mt-4 text-sm leading-6 text-muted">
                  Upload a PDF under 4MB. It is split into passages and embedded
                  on AWS Lambda, which takes a few seconds. Then ask questions
                  and an open-weight model answers from the passages it retrieves.
                  Nothing is kept. End the session and the document is deleted.
                </p>

                <label className="mt-6 block">
                  <span className="text-sm font-medium text-muted">Answering model</span>
                  <select
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                    className="focus-ring mt-2 w-full rounded-lg border border-line bg-black/20 px-3 py-2.5 text-sm text-heading"
                  >
                    {models.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span className="mt-2 block text-xs text-muted">
                    {models.find((option) => option.id === model)?.detail}
                  </span>
                </label>

                <label
                  className={`focus-within:border-accent mt-5 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-line px-6 py-10 text-center transition-colors hover:border-accent ${
                    busy ? 'pointer-events-none opacity-60' : ''
                  }`}
                >
                  {busy ? (
                    <Loader2 size={22} className="animate-spin text-accent" />
                  ) : (
                    <FileUp size={22} className="text-accent" />
                  )}
                  <span className="text-sm font-medium text-heading">
                    {busy ? 'Reading and embedding…' : 'Choose a PDF'}
                  </span>
                  <span className="text-xs text-muted">
                    {busy ? 'A cold start adds a few seconds' : 'Up to 4MB, text-based'}
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="sr-only"
                    disabled={busy}
                    onChange={(event) => upload(event.target.files?.[0])}
                  />
                </label>
              </>
            ) : (
              <>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-black/20 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-heading">
                      {session.name}
                    </p>
                    <p className="text-xs text-muted">
                      {session.chunks} passages indexed
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={endSession}
                    className="focus-ring inline-flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Trash2 size={14} />
                    End session
                  </button>
                </div>

                <label className="mt-4 flex items-center gap-3">
                  <span className="shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    Model
                  </span>
                  <select
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                    className="focus-ring min-w-0 flex-1 rounded-lg border border-line bg-black/20 px-3 py-2 text-sm text-heading"
                  >
                    {models.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div
                  ref={transcriptRef}
                  className="mt-4 flex max-h-72 min-h-32 flex-col gap-3 overflow-y-auto"
                  aria-live="polite"
                >
                  {turns.length === 0 && (
                    <p className="my-auto text-center text-sm text-muted">
                      Ask something the document actually covers. Off-topic questions
                      are declined by design.
                    </p>
                  )}
                  {turns.map((turn, index) => (
                    <Bubble key={index} turn={turn} />
                  ))}
                  {status === 'thinking' && (
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Loader2 size={14} className="animate-spin" />
                      Retrieving passages…
                    </div>
                  )}
                </div>

                <form onSubmit={ask} className="mt-4 flex gap-2">
                  <input
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="Ask about the document…"
                    aria-label="Your question"
                    disabled={busy}
                    className="focus-ring min-w-0 flex-1 rounded-lg border border-line bg-black/20 px-3 py-2.5 text-sm text-heading placeholder:text-muted"
                  />
                  <button
                    type="submit"
                    disabled={busy || !question.trim()}
                    aria-label="Send"
                    className="btn-primary focus-ring shrink-0 disabled:opacity-50"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </>
            )}

            {error && (
              <p className="mt-5 rounded-lg border border-line bg-black/20 p-3 text-sm text-muted">
                {error}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
