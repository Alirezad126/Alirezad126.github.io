import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import BackgroundFX from './components/BackgroundFX'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'

// Only the landing page is in the entry bundle. The rest are code-split, which
// keeps things like the tech-icon paths off the first load.
const NewsPage = lazy(() => import('./pages/NewsPage'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const PublicationsPage = lazy(() => import('./pages/PublicationsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Project write-ups are code-split: they pull in KaTeX and long-form content
// that the rest of the site never needs.
const SdDpcProject = lazy(() => import('./pages/projects/SdDpcProject'))
const DomparkProject = lazy(() => import('./pages/projects/DomparkProject'))
const AhuFaultDetectionProject = lazy(() => import('./pages/projects/AhuFaultDetectionProject'))
const EnergyHubProject = lazy(() => import('./pages/projects/EnergyHubProject'))
const BuildingSafeRlProject = lazy(() => import('./pages/projects/BuildingSafeRlProject'))
const RagGptProject = lazy(() => import('./pages/projects/RagGptProject'))
const SnakeProject = lazy(() => import('./pages/projects/SnakeProject'))
const PersonalAiChatbotProject = lazy(() => import('./pages/projects/PersonalAiChatbotProject'))

function PageFallback() {
  return <div className="shell py-24 text-muted">Loading…</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <BackgroundFX />
      <ScrollToTop />
      <Navbar />

      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/projects/sd-dpc-sparse-dictionary-control" element={<SdDpcProject />} />
          <Route path="/projects/dompark-energy-optimization" element={<DomparkProject />} />
          <Route path="/projects/ahu-fault-detection" element={<AhuFaultDetectionProject />} />
          <Route path="/projects/safe-rl-energy-hub" element={<EnergyHubProject />} />
          <Route path="/projects/building-safe-rl-dpc" element={<BuildingSafeRlProject />} />
          <Route path="/projects/rag-gpt-document-chatbot" element={<RagGptProject />} />
          <Route path="/projects/snake-dqn-agent" element={<SnakeProject />} />
          <Route path="/projects/personal-ai-chatbot" element={<PersonalAiChatbotProject />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  )
}
