import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Publications from './components/Publications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import EnergyHubProject from './pages/projects/EnergyHubProject'
import BuildingSafeRlProject from './pages/projects/BuildingSafeRlProject'
import RagGptProject from './pages/projects/RagGptProject'
import SnakeProject from './pages/projects/SnakeProject'
import PersonalAiChatbotProject from './pages/projects/PersonalAiChatbotProject'

function HomePage() {
  return (
    <main>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Publications />
      <Contact />
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/safe-rl-energy-hub" element={<EnergyHubProject />} />
        <Route path="/projects/building-safe-rl-dpc" element={<BuildingSafeRlProject />} />
        <Route path="/projects/rag-gpt-document-chatbot" element={<RagGptProject />} />
        <Route path="/projects/snake-dqn-agent" element={<SnakeProject />} />
        <Route path="/projects/personal-ai-chatbot" element={<PersonalAiChatbotProject />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}