import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Values from '../components/landing/Values';
import Services from '../components/landing/Services';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import LeadForm from '../components/landing/LeadForm';
import BlogSection from '../components/landing/BlogSection';
import Contact from '../components/landing/Contact';
import Footer from '../components/landing/Footer';
import { LogoProvider } from '../contexts/LogoContext';
import { LanguageProvider } from '../contexts/LanguageContext';

export default function LandingPage() {
  return (
    <LanguageProvider>
      <LogoProvider>
        <main data-testid="landing-page" className="bg-white font-sans">
          <Navbar />
          <Hero />
          <About />
          <Values />
          <Services />
          <Testimonials />
          <Pricing />
          <LeadForm />
          <BlogSection />
          <Contact />
          <Footer />
        </main>
      </LogoProvider>
    </LanguageProvider>
  );
}
