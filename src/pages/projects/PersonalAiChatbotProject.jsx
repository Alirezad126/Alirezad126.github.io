import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const tags = ['RAG', 'OpenAI', 'Vector Database', 'React', 'FastAPI']

export default function PersonalAiChatbotProject() {
  return (
    <main className="shell py-12 sm:py-16">

      <section className="relative">
        <Link
          to="/projects"
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">Personal AI System</p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              AI Chatbot with Retrieval-Augmented Generation
            </h1>

            <p className="mt-6 leading-7 text-muted">
              A personal chatbot designed to answer questions about my background,
              projects, research, and portfolio using retrieval-augmented generation.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="chip"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-card">
            <img
              src="/projects/chatbot_title.jpg"
              alt="Personal AI chatbot"
              className="h-full max-h-[460px] w-full object-cover"
            />
          </div>
        </div>

        <section className="mt-14 rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="eyebrow">Purpose</p>

          <p className="mt-5 font-medium leading-8 text-muted">
            This chatbot acts as an interactive version of my portfolio. Instead
            of browsing static pages, visitors can ask questions about my work,
            technical skills, publications, and project details.
          </p>
        </section>
      </section>
    </main>
  )
}