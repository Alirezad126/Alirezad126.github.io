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
    <p className="eyebrow">Full-Stack AI Application</p>

    <h1 className="mt-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
      RAG-GPT Personalized Document Chatbot
    </h1>

    <p className="mt-6 leading-7 text-muted">
      A retrieval-augmented chatbot that allows users to upload PDF
      documents and ask questions about their content.
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

    <a
      href="https://github.com/Alirezad126/RAGBot"
      target="_blank"
      rel="noreferrer"
      className="focus-ring mt-8 inline-flex items-center gap-2 btn-primary"
    >
      <Github size={18} />
      View GitHub
    </a>
  </div>

  <div className="overflow-hidden rounded-xl border border-line bg-card">
    <img
      src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*jtNZIbJ_MQc6u2TVt9QQAA.png"
      alt="RAG GPT chatbot"
      className="h-full max-h-[460px] w-full object-cover"
    />
  </div>
</div>
        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
            <p className="eyebrow">How It Works</p>

            <ol className="mt-6 space-y-5">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 font-medium text-muted"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-ink">
                    {index + 1}
                  </span>

                  <span className="leading-7">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
            <p className="eyebrow">System Design</p>

            <p className="mt-6 font-medium leading-8 text-muted">
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