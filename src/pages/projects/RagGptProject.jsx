import { ArrowLeft, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import TryLiveRagGpt from '../../components/TryLiveRagGpt'

const tags = ['RAG', 'ONNX', 'Open-weight LLMs', 'FastAPI', 'AWS Lambda', 'S3']

const steps = [
  {
    title: 'Ingest',
    body: 'An uploaded PDF is read and split into overlapping passages, breaking on paragraphs before lines before sentences so a passage rarely ends mid-thought.'
  },
  {
    title: 'Embed',
    body: 'Passages are embedded by a small ONNX model running inside the function itself, then written to S3 under a session id that only the visitor holds.'
  },
  {
    title: 'Retrieve',
    body: 'A follow-up question is first rewritten to stand on its own, then matched against the stored vectors by cosine similarity to select the passages that answer it.'
  },
  {
    title: 'Answer',
    body: 'Those passages and the conversation go to the chosen open-weight model, instructed to answer only from the document and to say when it does not know.'
  }
]

const decisions = [
  {
    title: 'No vector database',
    body: 'One document is a few hundred passages. The whole index loads in a single request and a dot product searches it in microseconds, where Chroma or pgvector would mean a process to keep running without being any faster at this size.'
  },
  {
    title: 'Embeddings in the function, generation over the wire',
    body: 'A 384-dimension embedding model is small enough to run on Lambda’s CPU in milliseconds, so indexing calls no API. A generative model worth showing needs a GPU, so that one step is a call to a provider serving open weights.'
  },
  {
    title: 'Nothing durable, nothing shared',
    body: 'Sessions are isolated by an id the browser keeps, deleted on request, and expired by a bucket lifecycle rule for visitors who simply close the tab. The model allowlist is enforced server-side, so a request cannot redirect the function to an arbitrary model.'
  }
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
              Upload a PDF and ask questions about it. The service retrieves the
              passages that bear on each question and answers from those alone,
              so a reply can be traced back to the document rather than to the
              model&rsquo;s training data.
            </p>

            <p className="mt-4 leading-7 text-muted">
              It runs on open-weight models end to end and costs nothing to
              operate: embeddings are computed inside an AWS Lambda function,
              generation goes to a free inference tier, and you choose which
              model answers.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <TryLiveRagGpt />
              <a
                href="https://github.com/Alirezad126/RAG-GPT"
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Github size={18} />
                View GitHub
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-card">
            <img
              src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*jtNZIbJ_MQc6u2TVt9QQAA.png"
              alt="Diagram of a retrieval-augmented generation pipeline"
              className="h-full max-h-[460px] w-full object-cover"
            />
          </div>
        </div>

        <section className="mt-14">
          <p className="eyebrow">The pipeline</p>

          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-line bg-card p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-ink">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-heading">{step.title}</h3>
                </div>
                <p className="mt-4 leading-7 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <p className="eyebrow">Design decisions</p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {decisions.map((decision) => (
              <div
                key={decision.title}
                className="rounded-xl border border-line bg-card p-6"
              >
                <h3 className="font-semibold text-heading">{decision.title}</h3>
                <p className="mt-4 leading-7 text-muted">{decision.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="eyebrow">Stack</p>

          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Serving', 'FastAPI behind a Lambda function URL, packaged as a container image.'],
              ['Embeddings', 'bge-small-en-v1.5 on onnxruntime, baked into the image.'],
              ['Generation', 'Open-weight models on a free inference tier, chosen per request.'],
              ['Storage', 'Session passages and vectors in S3, expired by lifecycle rule.']
            ].map(([term, description]) => (
              <div key={term}>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {term}
                </dt>
                <dd className="mt-2 leading-7 text-muted">{description}</dd>
              </div>
            ))}
          </dl>
        </section>
      </section>
    </main>
  )
}
