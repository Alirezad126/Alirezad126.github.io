import portfolio from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="section-shell text-center font-mono text-xs uppercase tracking-[0.18em] text-muted">
        {portfolio.name} © {new Date().getFullYear()} · Built with React & Tailwind
      </div>
    </footer>
  );
}
