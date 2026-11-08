import { ArrowLeft, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import TryLiveRagGpt from '../../components/TryLiveRagGpt'
import { Flow, SimilarityDiagram } from '../../components/PipelineFlow'

const indexing = [
  { title: 'Your PDF', note: 'Up to 4MB, text based' },
  { title: 'Passages', note: 'About 512 characters, overlapping' },
  { title: 'Embedding model', note: 'bge-small-en-v1.5, on the function CPU', accent: true },
  { title: 'S3', note: 'Text and vectors, keyed by session' }
]

const answering = [
  { title: 'Your question', note: 'Plus the conversation so far' },
  { title: 'Rewritten', note: 'Made to stand on its own' },
  { title: 'Search', note: 'Compared against every stored vector' },
  { title: 'Six passages', note: 'The closest matches' },
  { title: 'Your chosen model', note: 'Answers from those passages only', accent: true }
]

const tags = ['RAG', 'ONNX', 'Open-weight LLMs', 'FastAPI', 'AWS Lambda', 'S3']

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
              Upload a PDF and ask questions about it. The service finds the
              passages that bear on your question and answers from those,
              so you can trace a reply back to the document instead of to
              whatever the model picked up in training.
            </p>

            <p className="mt-4 leading-7 text-muted">
              Everything runs on open models and nothing costs anything to
              operate. The embeddings are computed inside an AWS Lambda
              function, the answers come from a free inference tier, and you
              pick which model writes them.
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

        <section className="mt-14 max-w-3xl">
          <p className="eyebrow">How it works</p>

          <p className="mt-6 leading-8 text-muted">
            A language model cannot read a file you hand it at runtime, and a
            long document would not fit in its context window anyway. The way
            around that is to index the document once and then, for each
            question, pull back only the few passages that actually matter.
          </p>

          <h3 className="mt-10 font-semibold text-heading">
            When you upload a document
          </h3>

          <Flow steps={indexing} caption="This runs once, when the file arrives." />

          <p className="mt-4 leading-8 text-muted">
            The PDF is read page by page and the text is split into passages of
            roughly 512 characters. The splitter tries paragraph breaks first,
            then line breaks, then sentence and clause boundaries, so it only
            cuts mid-sentence if a single unbroken run of text gives it no
            other option. Neighbouring passages share about 64 characters, which
            means a sentence sitting on a boundary still appears whole in one of
            them.
          </p>

          <p className="mt-4 leading-8 text-muted">
            Each passage then goes through bge-small-en-v1.5, a small embedding
            model that turns text into a 384-dimension vector and places
            passages with similar meaning close to each other. It runs as ONNX
            on the function's own CPU and takes milliseconds per passage, so
            indexing never calls out to an API. The passages and their vectors
            are written to S3 under a session id that only your browser holds.
          </p>

          <h3 className="mt-10 font-semibold text-heading">
            When you ask a question
          </h3>

          <Flow steps={answering} caption="This runs again for every question you send." />

          <p className="mt-4 leading-8 text-muted">
            A follow-up like "and how close was it?" means nothing on its own,
            so the model first rewrites the question into one that stands by
            itself, using the conversation so far. That rewritten question is
            embedded by the same model and compared against every stored vector
            by cosine similarity, which measures the angle between two vectors
            rather than how many words they have in common. Two passages can
            match well without sharing any vocabulary. The six closest ones
            become the context.
          </p>

          <SimilarityDiagram />

          <p className="mt-4 leading-8 text-muted">
            Those passages go to the model you picked, along with the
            conversation and your original question. The system prompt holds it
            to what the passages actually say, keeps answers to three sentences,
            and tells it to decline anything the document does not cover rather
            than fall back on training data. That last instruction is what stops
            it from confidently answering questions your PDF never addressed.
          </p>
        </section>

        <section className="mt-14 max-w-3xl">
          <p className="eyebrow">The models</p>

          <p className="mt-6 leading-8 text-muted">
            There are two jobs here and they pull in opposite directions.
            Matching a question to passages wants a small encoder that can run
            anywhere, while writing the answer wants a large generative model
            that has no business running on a CPU. So the first one lives inside
            the function and the second is a call over the network.
          </p>

          <p className="mt-4 leading-8 text-muted">
            For the matching half, bge-small-en-v1.5 is a 33M parameter encoder
            that comes to about 64MB once exported to ONNX. That is small enough
            to ship inside the container image, which means no download on a
            cold start and no API bill for indexing.
          </p>

          <p className="mt-4 leading-8 text-muted">
            For the answering half there are three open-weight models to choose
            from in the demo. GPT-OSS 20B is the default and usually replies in
            well under a second. GPT-OSS 120B handles questions that need
            several passages stitched together, at some cost in speed. Qwen3.8
            27B holds up well on dense technical writing. The list is checked
            against what the provider is actually serving before it reaches the
            dropdown, because free catalogues change without warning and a model
            that quietly disappeared should drop off the menu rather than fail
            when someone picks it.
          </p>
        </section>

        <section className="mt-14 max-w-3xl">
          <p className="eyebrow">Design decisions</p>

          <p className="mt-6 leading-8 text-muted">
            There is no vector database. A single document comes out to a few
            hundred passages, so the whole index loads in one request and a dot
            product searches it in microseconds. Running Chroma or pgvector
            would mean keeping a process alive without being any faster at this
            size.
          </p>

          <p className="mt-4 leading-8 text-muted">
            There is also no server between requests. The service is one Lambda
            function behind a URL, so nothing runs or bills while nobody is
            using it. The price for that is a cold start of a few seconds on the
            first request, which is why the model weights are baked into the
            image instead of downloaded, and why the index lives in S3 rather
            than on local disk. An invocation keeps nothing.
          </p>

          <p className="mt-4 leading-8 text-muted">
            Sessions stay isolated and short-lived. Each one is keyed by an id
            your browser holds, deleted as soon as you end the session, and
            expired by a lifecycle rule a day later for anyone who just closes
            the tab. The model choice is checked against an allowlist on the
            server, so a request cannot point the function at some other model.
          </p>
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
