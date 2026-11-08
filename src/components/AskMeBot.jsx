import { useEffect, useRef, useState } from 'react'
import { Loader2, MessageSquare, Send, Sparkles, X } from 'lucide-react'

const ENDPOINT = (import.meta.env.VITE_BOT_API_URL ?? '').replace(/\/$/, '')

// Long enough that the greeting arrives after the visitor has started reading,
// rather than landing on top of the hero.
const GREETING_DELAY_MS = 9000
const GREETED_KEY = 'askmebot-greeted'

const OPENING = "Hi, I'm Alireza. Ask me anything about my research or my work."

const SUGGESTIONS = [
  'What are you working on now?',
  'Tell me about your thesis',
  'What did you do at IranBar?'
]

function Bubble({ turn }) {
  const mine = turn.type === 'user'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <p
        className={`max-w-[85%] rounded-xl px-3.5 py-2 text-[15px] leading-6 ${
          mine
            ? 'bg-accent font-medium text-ink'
            : 'border border-line bg-black/5 text-muted dark:bg-black/20'
        }`}
      >
        {turn.message}
      </p>
    </div>
  )
}

export default function AskMeBot() {
  const [open, setOpen] = useState(false)
  const [greeting, setGreeting] = useState(false)
  const [turns, setTurns] = useState([{ type: 'ai', message: OPENING }])
  const [question, setQuestion] = useState('')
  const [thinking, setThinking] = useState(false)
  const [error, setError] = useState(null)
  const transcriptRef = useRef(null)
  const inputRef = useRef(null)

  // The greeting is the whole point of the bubble, but only the first time in
  // a tab. Someone reading three project pages should not be tapped on the
  // shoulder on each of them.
  useEffect(() => {
    if (!ENDPOINT) return undefined
    let greeted = false
    try {
      greeted = sessionStorage.getItem(GREETED_KEY) === '1'
    } catch {
      // Private window, or storage is blocked. Greet and move on.
    }
    if (greeted) return undefined

    const timer = setTimeout(() => {
      setGreeting(true)
      try {
        sessionStorage.setItem(GREETED_KEY, '1')
      } catch {
        // Nothing to do, the greeting just shows again next navigation.
      }
    }, GREETING_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    inputRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [turns, thinking])

  function launch() {
    setGreeting(false)
    setOpen(true)
  }

  async function send(message) {
    const text = message.trim()
    if (!text || thinking) return

    // The opening line is the widget's own, not something the model said, so
    // it stays out of the history the backend rewrites follow-ups against.
    const history = turns.slice(1)
    setTurns((current) => [...current, { type: 'user', message: text }])
    setQuestion('')
    setThinking(true)
    setError(null)

    try {
      const response = await fetch(`${ENDPOINT}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationState: history.map((turn, index) => ({ ...turn, id: index }))
        })
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? 'The free tier is rate limited. Try again in a minute.'
            : data.detail ?? `Request failed (${response.status})`
        )
      }
      setTurns((current) => [...current, { type: 'ai', message: data.AIResponse }])
    } catch (err) {
      setError(err.message)
      setTurns((current) => current.slice(0, -1))
      setQuestion(text)
    } finally {
      setThinking(false)
    }
  }

  if (!ENDPOINT) return null

  const asked = turns.length > 1

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {greeting && !open && (
        <div className="flex max-w-[17rem] items-start gap-2 rounded-xl border border-line bg-card p-3.5 shadow-lg">
          <button
            type="button"
            onClick={launch}
            className="focus-ring text-left text-[15px] leading-6 text-muted"
          >
            {OPENING}
          </button>
          <button
            type="button"
            onClick={() => setGreeting(false)}
            aria-label="Dismiss"
            className="focus-ring -mr-1 -mt-1 shrink-0 rounded-md p-1 text-muted transition-colors hover:text-accent"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Ask Alireza"
          className="flex h-[min(32rem,70vh)] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-line bg-card shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <p className="text-[15px] font-semibold text-heading">Ask me anything</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="focus-ring rounded-md p-1 text-muted transition-colors hover:text-accent"
            >
              <X size={17} />
            </button>
          </div>

          <div
            ref={transcriptRef}
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {turns.map((turn, index) => (
              <Bubble key={index} turn={turn} />
            ))}

            {thinking && (
              <div className="flex items-center gap-2 text-[15px] text-muted">
                <Loader2 size={14} className="animate-spin" />
                Looking it up…
              </div>
            )}

            {!asked && !thinking && (
              <div className="mt-1 flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => send(suggestion)}
                    className="focus-ring rounded-md border border-line px-2.5 py-1 text-[13px] font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p className="rounded-lg border border-line bg-black/5 p-3 text-[13px] text-muted dark:bg-black/20">
                {error}
              </p>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              send(question)
            }}
            className="flex gap-2 border-t border-line px-3 py-3"
          >
            <input
              ref={inputRef}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about my work…"
              aria-label="Your question"
              disabled={thinking}
              className="focus-ring min-w-0 flex-1 rounded-lg border border-line bg-black/5 px-3 py-2 text-[15px] text-heading placeholder:text-muted dark:bg-black/20"
            />
            <button
              type="submit"
              disabled={thinking || !question.trim()}
              aria-label="Send"
              className="focus-ring shrink-0 rounded-lg bg-accent px-3 py-2 text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : launch())}
        aria-label={open ? 'Close the chat' : 'Ask me anything'}
        aria-expanded={open}
        className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink shadow-lg transition-transform hover:scale-105"
      >
        {open ? (
          <X size={22} />
        ) : (
          <span className="flex flex-col items-center leading-none">
            <MessageSquare size={17} />
            <span className="mt-0.5 font-mono text-[11px] font-bold tracking-[0.08em]">
              AI
            </span>
          </span>
        )}
      </button>
    </div>
  )
}
