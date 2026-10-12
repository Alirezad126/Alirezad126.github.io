import Hero from '../components/Hero'
import News from '../components/News'
import Projects from '../components/Projects'

export default function Home() {
  return (
    <main>
      <Hero />
      <News limit={3} heading="Latest news." showMore />
      <Projects limit={3} heading="Featured work." showFilters={false} showMore />
    </main>
  )
}
