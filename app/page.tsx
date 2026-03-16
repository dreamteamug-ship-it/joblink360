import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AgentCards from '@/components/AgentCards'
import FeaturesSection from '@/components/FeaturesSection'
import Footer from '@/components/Footer'
import AmandaChat from '@/components/AmandaChat'

export default function Home() {
  return (
    <main className="gradient-mesh min-h-screen">
      <Navbar />
      <HeroSection />
      <AgentCards />
      <FeaturesSection />
      <Footer />
      <AmandaChat />
    </main>
  )
}
