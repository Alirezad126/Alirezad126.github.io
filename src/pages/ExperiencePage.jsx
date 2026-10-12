import Education from '../components/Education'
import Experience from '../components/Experience'
import Skills from '../components/Skills'

export default function ExperiencePage() {
  return (
    <main className="shell py-12 sm:py-16">
      <h1 className="sr-only">Experience, education and skills</h1>

      <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
        <Experience inset />

        <div className="grid content-start gap-12">
          <Education inset />
          <Skills inset />
        </div>
      </div>
    </main>
  )
}
