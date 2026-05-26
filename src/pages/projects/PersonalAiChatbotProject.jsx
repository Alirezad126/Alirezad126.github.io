import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const tags = ['RAG', 'OpenAI', 'Vector Database', 'React', 'FastAPI']

export default function PersonalAiChatbotProject() {
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
            <p className="section-label">Personal AI System</p>

            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-6xl dark:text-white">
              AI Chatbot with Retrieval-Augmented Generation
            </h1>

            <p className="mt-6 text-lg font-medium leading-8 text-slate-700 dark:text-muted">
              A personal chatbot designed to answer questions about my background,
              projects, research, and portfolio using retrieval-augmented generation.
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
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-400 bg-white/90 shadow-card backdrop-blur-md dark:border-line dark:bg-white/[0.04]">
            <img
              src="/projects/chatbot_title.jpg"
              alt="Personal AI chatbot"
              className="h-full max-h-[460px] w-full object-cover"
            />
          </div>
        </div>

        <section className="mt-14 rounded-3xl border border-slate-400 bg-white/90 p-6 shadow-card backdrop-blur-md sm:p-8 dark:border-line dark:bg-white/[0.04]">
          <p className="section-label">Purpose</p>

          <p className="mt-5 font-medium leading-8 text-slate-700 dark:text-muted">
            This chatbot acts as an interactive version of my portfolio. Instead
            of browsing static pages, visitors can ask questions about my work,
            technical skills, publications, and project details.
          </p>
        </section>
      </section>
    </main>
  )
}