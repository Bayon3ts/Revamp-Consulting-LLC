import './index.css';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import ServicesSection from './sections/ServicesSection';
import ImpactSection from './sections/ImpactSection';
import LeadershipSection from './sections/LeadershipSection';
import EngagementModelsSection from './sections/EngagementModelsSection';
import ConsultationSection from './sections/ConsultationSection';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <ImpactSection />
        <LeadershipSection />
        <EngagementModelsSection />
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
}
