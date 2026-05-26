import { Github, Linkedin, Mail, Send, Twitter } from 'lucide-react';
import portfolio from '../data/portfolio';
import useInView from '../hooks/useInView';

const socials = [
  { label: 'GitHub', href: portfolio.contact.github, icon: Github },
  { label: 'LinkedIn', href: portfolio.contact.linkedin, icon: Linkedin },
  { label: 'Twitter', href: portfolio.contact.twitter, icon: Twitter },
  { label: 'Email', href: `mailto:${portfolio.contact.email}`, icon: Mail }
];

export default function Contact() {
  const { ref, isVisible } = useInView();

  return (
    <section id="contact" ref={ref} className={`section-shell reveal py-24 ${isVisible ? 'is-visible' : ''}`}>
      <div className="glass-card grid overflow-hidden rounded-3xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-line p-7 sm:p-10 lg:border-b-0 lg:border-r">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let’s build something intelligent.</h2>
          <p className="mt-6 leading-8 text-muted">
            Reach out for ML engineering, applied research, data products, or collaboration opportunities.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.04] px-4 py-3 text-muted transition hover:-translate-y-1 hover:border-accent hover:text-accent"
              >
                <Icon size={18} />
                <span className="font-mono text-xs">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <form
          action={`mailto:${portfolio.contact.email}`}
          method="post"
          encType="text/plain"
          className="space-y-5 p-7 sm:p-10"
        >
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Name</span>
            <input
              name="name"
              required
              className="focus-ring mt-2 w-full rounded-xl border border-line bg-white/[0.04] px-4 py-3 text-white placeholder:text-muted/60 focus:border-accent"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Email</span>
            <input
              name="email"
              type="email"
              required
              className="focus-ring mt-2 w-full rounded-xl border border-line bg-white/[0.04] px-4 py-3 text-white placeholder:text-muted/60 focus:border-accent"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Message</span>
            <textarea
              name="message"
              required
              rows="6"
              className="focus-ring mt-2 w-full resize-none rounded-xl border border-line bg-white/[0.04] px-4 py-3 text-white placeholder:text-muted/60 focus:border-accent"
              placeholder="Tell me about your project..."
            />
          </label>
          <button
            type="submit"
            className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-bold text-ink shadow-glow transition hover:-translate-y-1 sm:w-auto"
          >
            Send Message
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
