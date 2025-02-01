import Hero from '@/components/Hero'
import About from '@/components/About'
import HowItWorks from '@/components/HowItWorka'
import Developers from '@/components/Developers'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Hero />
      <About />
      <HowItWorks />
      <Developers />
      <Footer />
    </main>
  )
}

