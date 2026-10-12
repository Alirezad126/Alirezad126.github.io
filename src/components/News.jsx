import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import portfolio from '../data/portfolio'

function formatDate(value) {
  const [year, month] = value.split('-')
  const date = new Date(Number(year), Number(month ?? 1) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function News({ limit, heading = 'Latest news.', showMore = false }) {
  const news = portfolio.news ?? []

  if (news.length === 0) return null

  const visible = limit ? news.slice(0, limit) : news

  return (
    <section className="section">
      <p className="eyebrow">News</p>
      <h2 className="h2">{heading}</h2>

      <ol className="mt-10 border-l border-line">
        {visible.map((item) => {
          const Wrapper = item.href ? 'a' : 'div'

          return (
            <li key={item.title} className="relative pl-7 pb-8 last:pb-0">
              <span className="absolute -left-[4.5px] top-2.5 h-2 w-2 rounded-full bg-accent" />

              <Wrapper
                {...(item.href
                  ? { href: item.href, target: '_blank', rel: 'noreferrer' }
                  : {})}
                className={`focus-ring block rounded ${item.href ? 'group' : ''}`}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <time className="font-mono text-[13px] text-muted">
                    {formatDate(item.date)}
                  </time>
                  {item.tag && <span className="chip">{item.tag}</span>}
                </div>

                <h3 className="mt-2 flex items-start gap-1.5 text-lg font-semibold text-heading group-hover:text-accent">
                  {item.title}
                  {item.href && (
                    <ArrowUpRight size={17} className="mt-1 shrink-0 text-accent" />
                  )}
                </h3>

                {item.body && (
                  <p className="mt-1.5 max-w-3xl leading-7">{item.body}</p>
                )}
              </Wrapper>
            </li>
          )
        })}
      </ol>

      {showMore && news.length > visible.length && (
        <Link
          to="/news"
          className="focus-ring mt-8 inline-flex items-center gap-2 rounded font-semibold text-accent hover:gap-3"
        >
          All news
          <ArrowRight size={17} />
        </Link>
      )}
    </section>
  )
}
