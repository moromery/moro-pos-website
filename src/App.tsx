import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import TrustedBy from './sections/TrustedBy'
import Features from './sections/Features'
import Modules from './sections/Modules'
import Statistics from './sections/Statistics'
import Tutorials from './sections/Tutorials'
import Testimonials from './sections/Testimonials'
import Pricing from './sections/Pricing'
import CTA from './sections/CTA'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-deep overflow-x-hidden" dir="rtl">
      <Navigation />
      <Hero />
      <TrustedBy />
      <Features />
      <Modules />
      <Statistics />
      <Tutorials />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  )
}
