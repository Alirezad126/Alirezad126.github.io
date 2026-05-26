import { ArrowLeft, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

const tags = ['RAG', 'LangChain', 'OpenAI', 'FastAPI', 'React', 'Docker']

const steps = [
  'User uploads a PDF document.',
  'The backend processes, chunks, and embeds the document.',
  'Relevant chunks are retrieved using semantic search.',
  'The language model generates an answer grounded in the uploaded content.'
]

export default function RagGptProject() {
  return (
    <main className="relative overflow-hidden px-4 pt-28 pb-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-[-20%] top-[10%] h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-20%] bottom-[10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <section className="relative mx-auto max-w-6xl">
        <Link
          to="/#projects"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-400 bg-white/80 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-slate-800 shadow-card transition hover:border-accent hover:text-accent dark:border-line dark:bg-white/5 dark:text-muted"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

<div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
  <div>
    <p className="section-label">Full-Stack AI Application</p>

    <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-6xl dark:text-white">
      RAG-GPT Personalized Document Chatbot
    </h1>

    <p className="mt-6 text-lg font-medium leading-8 text-slate-700 dark:text-muted">
      A retrieval-augmented chatbot that allows users to upload PDF
      documents and ask questions about their content.
    </p>

    <div className="mt-8 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-800 dark:text-accent"
        >
          {tag}
        </span>
      ))}
    </div>

    <a
      href="https://github.com/Alirezad126/RAGBot"
      target="_blank"
      rel="noreferrer"
      className="focus-ring mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-slate-950 shadow-glow transition hover:-translate-y-1"
    >
      <Github size={18} />
      View GitHub
    </a>
  </div>

  <div className="overflow-hidden rounded-3xl border border-slate-400 bg-white/90 shadow-card backdrop-blur-md dark:border-line dark:bg-white/[0.04]">
    <img
      src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*jtNZIbJ_MQc6u2TVt9QQAA.png"
      alt="RAG GPT chatbot"
      className="h-full max-h-[460px] w-full object-cover"
    />
  </div>
</div>
        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-400 bg-white/90 p-6 shadow-card backdrop-blur-md sm:p-8 dark:border-line dark:bg-white/[0.04]">
            <p className="section-label">How It Works</p>

            <ol className="mt-6 space-y-5">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 font-medium text-slate-700 dark:text-muted"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-slate-950 shadow-glow">
                    {index + 1}
                  </span>

                  <span className="leading-7">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-slate-400 bg-white/90 p-6 shadow-card backdrop-blur-md sm:p-8 dark:border-line dark:bg-white/[0.04]">
            <p className="section-label">System Design</p>

            <p className="mt-6 font-medium leading-8 text-slate-700 dark:text-muted">
              The app uses a React frontend, FastAPI backend, LangChain pipeline,
              OpenAI language models, and a vector database for semantic retrieval.
              The application was containerized with Docker for easier deployment.
            </p>
          </div>
        </section>
      </section>
    </main>
  )
}