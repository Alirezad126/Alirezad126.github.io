import { ArrowLeft, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import TryLiveRagGpt from '../../components/TryLiveRagGpt'

const tags = ['RAG', 'ONNX', 'Open-weight LLMs', 'FastAPI', 'AWS Lambda', 'S3']

const steps = [
  {
    title: 'Ingest',
    when: 'On upload',
    body: 'The PDF is parsed page by page and its text concatenated, then split into passages of about 512 characters. The splitter works down a hierarchy of separators — paragraph breaks first, then line breaks, then sentence and clause boundaries — so it only ever cuts mid-sentence when a single run of text leaves it no choice. Consecutive passages share a 64-character overlap, which keeps a sentence that straddles a boundary intact in at least one of them.'
  },
  {
    title: 'Embed',
    when: 'On upload',
    body: 'Every passage is turned into a 384-dimension vector by bge-small-en-v1.5, a sentence-embedding model that places text with similar meaning close together in that space. It runs as ONNX inside the Lambda function on CPU, taking milliseconds per passage and calling no external service. The passages and their vectors are written to S3 under a session id that only the visitor holds.'
  },
  {
    title: 'Retrieve',
    when: 'On each question',
    body: 'A follow-up like “and how close was it?” means nothing on its own, so the chat model first rewrites it into a standalone question using the conversation so far. That rewritten question is embedded by the same model, and its vector is compared against every stored passage by cosine similarity — the angle between vectors, which measures similarity of meaning rather than overlap of words. The six closest passages become the context.'
  },
  {
    title: 'Answer',
    when: 'On each question',
    body: 'Those six passages, the conversation history and the original question go to the model the visitor picked. A system prompt restricts it to what the excerpts actually say, caps the answer at three sentences, and tells it to decline anything the document does not cover rather than fall back on what it learned in training.'
  }
]

const models = [
  {
    name: 'bge-small-en-v1.5',
    role: 'Embeddings',
    body: 'A 33M-parameter encoder, ~64MB as ONNX weights. Small enough to ship inside the function image and run on CPU, so indexing a document costs nothing and waits on no API.'
  },
  {
    name: 'GPT-OSS 20B / 120B',
    role: 'Generation',
    body: 'Open-weight models served on a free inference tier. The 20B answers in well under a second and is the default; the 120B reasons better across several passages at some cost in latency.'
  },
  {
    name: 'Qwen3.8 27B',
    role: 'Generation',
    body: 'A third option that holds up well on dense technical prose. The picker is filtered against the models the provider is actually serving, so the list reflects what will work rather than what was true when it was written.'
  }
]

const decisions = [
  {
    title: 'No vector database',
    body: 'One document is a few hundred passages. The whole index loads in a single request and a dot product searches it in microseconds, where Chroma or pgvector would mean a process to keep running without being any faster at this size.'
  },
  {
    title: 'No server between requests',
    body: 'The whole service is one Lambda function behind a URL, so nothing runs or bills between visits. The cost is a cold start of a few seconds on the first request, which is why the model weights are baked into the image rather than downloaded — and why an invocation keeps no state, pushing the index out to S3.'
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

          <p className="mt-4 max-w-3xl leading-7 text-muted">
            A language model cannot read a document you hand it at runtime, and
            a long one will not fit in its context in any case. Retrieval
            augmentation works around that: the document is indexed once, and
            each question pulls back only the few passages that bear on it.
          </p>

          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-line bg-card p-6"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-ink">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-heading">{step.title}</h3>
                  <span className="ml-auto whitespace-nowrap text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    {step.when}
                  </span>
                </div>
                <p className="mt-4 leading-7 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <p className="eyebrow">Models</p>

          <p className="mt-4 max-w-3xl leading-7 text-muted">
            Two different jobs, and they pull in opposite directions. Matching a
            question to passages needs a small encoder that can run anywhere;
            writing the answer needs a large generative model that cannot
            realistically run on a CPU. So the first lives inside the function
            and the second is called over the network.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {models.map((model) => (
              <div
                key={model.name}
                className="rounded-xl border border-line bg-card p-6"
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  {model.role}
                </p>
                <h3 className="mt-2 font-mono text-sm font-semibold text-heading">
                  {model.name}
                </h3>
                <p className="mt-4 leading-7 text-muted">{model.body}</p>
              </div>
            ))}
          </div>
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
