import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Comparison from './components/Comparison';
import Calculator from './components/Calculator';
import AuditShield from './components/AuditShield';
import SocialProof from './components/SocialProof';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import LeadMagnet from './components/LeadMagnet';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Global Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <Header />

      <main className="pt-24">
        <Hero />
        <Comparison />
        <Calculator />
        <AuditShield />
        <SocialProof />
        <Pricing />
        <FAQ />
        <LeadMagnet />
      </main>

      <Footer />
    </div>
  );
};

export default App;
