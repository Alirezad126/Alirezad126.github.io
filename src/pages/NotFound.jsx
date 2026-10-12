import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="shell py-24">
      <p className="eyebrow">404</p>
      <h1 className="h2">This page doesn&apos;t exist.</h1>

      <Link to="/" className="btn-ghost focus-ring mt-8">
        <ArrowLeft size={18} />
        Back home
      </Link>
    </main>
  )
}
