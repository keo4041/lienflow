"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Mail,
  Calculator,
  TrendingDown,
  Check,
  ArrowRight,
  Shield,
  QrCode,
  CheckCircle2,
  Lock,
  ChevronDown,
  LayoutDashboard,
  RefreshCcw,
  CreditCard,
  Settings,
  Plus
} from "lucide-react";
import { KillSheetCalculator } from "@/components/marketing/KillSheetCalculator";
import { fadeIn, staggerContainer, ctaPulse } from "@/lib/animations";
import { useRef } from "react";

const Logo = () => (
  <div className="flex items-center gap-3 group">
    <div className="relative">
      <div className="w-10 h-10 bg-qb-green rounded-lg flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform">
        <Shield className="text-white w-6 h-6" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-safety-orange rounded-md flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
        <Mail className="text-white w-4 h-4" />
      </div>
    </div>
    <span className="text-2xl font-black font-roboto-slab tracking-tight">
      Lien<span className="text-qb-green">Flow</span>
    </span>
  </div>
);

export default function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="min-h-screen bg-[#131313] carbon-texture text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5 bg-[#131313]/50 backdrop-blur-xl p-4 flex justify-between items-center px-8 md:px-16">
        <Logo />
        <div className="hidden md:flex gap-4 items-center">
          <button onClick={() => window.location.href="/auth"} className="text-zinc-400 hover:text-white font-bold transition-colors">Log In</button>
          <motion.button
            variants={ctaPulse}
            initial="initial"
            animate="animate"
            onClick={() => window.location.href="/auth"}
            className="btn-primary"
          >
            Sync with QuickBooks
          </motion.button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section ref={targetRef} className="relative pt-24 pb-32 px-8 overflow-hidden">
          <motion.div
            style={{ opacity, scale }}
            className="max-w-6xl mx-auto text-center relative z-10"
          >
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-8"
            >
              <CheckCircle2 className="w-4 h-4 text-qb-green" />
              Official QuickBooks Partner
            </motion.div>

            <motion.h1
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-black font-roboto-slab leading-[1.1] mb-8 text-balance"
            >
              Turn QuickBooks Invoices into <span className="text-qb-green">Certified Mail</span> in One Click.
            </motion.h1>

            <motion.p
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Stop driving to the Post Office. We auto-detect jobs, verify addresses with USPS, and mail your Preliminary Notices for less than the cost of a stamp.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
            >
              <button onClick={() => window.location.href="/auth"} className="btn-primary w-full md:w-auto text-xl h-16 px-12 group">
                Start Free Trial (Sync QB)
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary w-full md:w-auto text-xl h-16 px-12"
              >
                Calculate Loss
              </button>
            </motion.div>

            {/* Trust Anchors */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                <span className="font-bold text-xs uppercase tracking-widest">CASS-Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-6 h-6" />
                <span className="font-bold text-xs uppercase tracking-widest">USPS Compatible</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-6 h-6" />
                <span className="font-bold text-xs uppercase tracking-widest">Zero-Trust Security</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-qb-green/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-safety-orange/10 blur-[120px] rounded-full" />
          </div>
        </section>

        {/* Agitation Section */}
        <section className="py-32 px-8 bg-zinc-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* The Old Way */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card p-12 rounded-[2.5rem] bg-zinc-950/50 border-white/5 opacity-60 grayscale scale-95"
              >
                <div className="mb-8 p-4 w-fit bg-zinc-800 rounded-2xl text-zinc-500">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-6">The Chaos of Manual</h3>
                <ul className="space-y-4 text-zinc-500 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500/50">✕</span>
                    Typing Word templates manually
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500/50">✕</span>
                    .80+ per postage stamp
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500/50">✕</span>
                    Driving to the Post Office
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500/50">✕</span>
                    Lost certified mail receipts
                  </li>
                </ul>
                <p className="text-zinc-600 font-bold uppercase text-xs tracking-widest">Status: Frustrated</p>
              </motion.div>

              {/* The LienFlow Way */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card p-12 rounded-[2.5rem] border-qb-green/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 text-qb-green/5">
                  <ShieldCheck size={120} />
                </div>
                <div className="mb-8 p-4 w-fit bg-qb-green/20 rounded-2xl text-qb-green">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-6">The LienFlow Sync</h3>
                <ul className="space-y-4 text-zinc-300 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="text-qb-green" />
                    Auto-detects QuickBooks Invoices
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-qb-green" />
                    Verified CASS Mailing Addresses
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-qb-green" />
                    Digital Proof of Delivery Vault
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-qb-green" />
                    Audit Shield Protection
                  </li>
                </ul>
                <p className="text-qb-green font-bold uppercase text-xs tracking-widest">Status: Protected</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Kill Sheet Calculator */}
        <KillSheetCalculator />

        {/* Audit Shield Section */}
        <section className="py-32 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card rounded-[3rem] overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-12 md:p-20 space-y-8">
                  <div className="flex items-center gap-3 text-qb-green">
                    <Shield className="w-6 h-6" fill="currentColor" />
                    <span className="text-sm font-black uppercase tracking-[0.2em]">Audit Shield</span>
                  </div>
                  <h2 className="font-roboto-slab text-5xl font-bold leading-tight">Forensic Accounting for Your Job Site</h2>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Most software is dumb—it mails what you type. Our Zero-Trust Engine catches duplicate invoices and address mismatches before you mail them. We don't just send mail; we save your lien rights.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                      <QrCode className="text-safety-orange w-6 h-6 shrink-0" />
                      <div>
                        <p className="font-bold">Digital Chain of Custody</p>
                        <p className="text-sm text-zinc-500">Every touchpoint logged by USPS is instantly synced to your QB invoice.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                      <ShieldCheck className="text-qb-green w-6 h-6 shrink-0" />
                      <div>
                        <p className="font-bold">USPS CASS Address Scans</p>
                        <p className="text-sm text-zinc-500">We verify the physical existence of every shipping address before you pay.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-full min-h-[400px] bg-zinc-950 flex items-center justify-center p-12">
                   {/* Animated Scanner Visual */}
                   <div className="relative w-full max-w-sm aspect-[3/4] glass-card border-white/10 rounded-2xl p-8 flex flex-col gap-4 overflow-hidden">
                      <div className="w-full h-8 bg-white/10 rounded-md animate-pulse" />
                      <div className="w-3/4 h-4 bg-white/5 rounded-md" />
                      <div className="w-full h-px bg-white/10 my-4" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-20 bg-white/5 rounded-lg" />
                        <div className="h-20 bg-white/5 rounded-lg" />
                      </div>
                      <div className="mt-auto h-12 bg-qb-green/20 border border-qb-green/30 rounded-xl flex items-center justify-center gap-2">
                         <div className="w-2 h-2 bg-qb-green rounded-full animate-ping" />
                         <span className="text-xs font-bold text-qb-green uppercase tracking-tighter">Verified</span>
                      </div>

                      {/* Scanning Line */}
                      <motion.div
                        initial={{ top: 0 }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-qb-green shadow-[0_0_20px_rgba(44,160,28,1)] z-10"
                      />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-32 px-8 bg-zinc-900/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-roboto-slab text-5xl font-bold">Precision Pricing</h2>
              <p className="text-zinc-500 text-lg">Choose the volume that fits your project pipeline.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pay-As-You-Go */}
              <motion.div
                whileHover={{ y: -10 }}
                className="glass-card p-12 rounded-[2.5rem] flex flex-col items-center text-center"
              >
                <div className="mb-8 p-4 bg-zinc-800 rounded-full text-zinc-400">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Pay-As-You-Go</h3>
                <div className="mb-8">
                  <p className="text-6xl font-black font-roboto-slab leading-none mb-2">4.95</p>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Per Notice Sent</p>
                </div>
                <ul className="w-full space-y-4 text-zinc-400 text-sm mb-12 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-zinc-600" />
                    QuickBooks Sync Included
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-zinc-600" />
                    USPS Tracking Included
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-zinc-600" />
                    No Monthly Fees
                  </li>
                </ul>
                <button className="w-full py-5 border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-colors mt-auto">
                  Get Started
                </button>
              </motion.div>

              {/* Pro Subscription */}
              <motion.div
                whileHover={{ y: -10 }}
                className="glass-card p-12 rounded-[2.5rem] flex flex-col items-center text-center border-safety-orange/40 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-safety-orange" />
                <div className="absolute top-6 right-6">
                   <div className="bg-safety-orange text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    Cheaper than DIY
                  </div>
                </div>
                <div className="mb-8 p-4 bg-safety-orange/20 rounded-full text-safety-orange">
                  <TrendingDown className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro Subscription</h3>
                <div className="mb-8">
                  <p className="text-6xl font-black font-roboto-slab leading-none mb-2">9.95</p>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Per Notice + 9/mo</p>
                </div>
                <ul className="w-full space-y-4 text-zinc-300 text-sm mb-12 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-qb-green" />
                    All Pay-As-You-Go Features
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-qb-green" />
                    Priority Batch Processing
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-qb-green" />
                    White-Glove Onboarding
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-qb-green" />
                    Multiple Users/Projects
                  </li>
                </ul>
                <button onClick={() => window.location.href="/auth"} className="btn-orange w-full py-5 text-lg">
                  Start Pro Trial
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="font-roboto-slab text-4xl font-bold text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Won't this upset my General Contractor?",
                  a: "No. Professional GCs expect notices. It proves you're a professional organization and protects them from surprise liens. It's standard operating procedure for top-tier subs."
                },
                {
                  q: "Can I cancel at any time?",
                  a: "Absolutely. We aren't Levelset. No 0,000 contracts. No aggressive sales calls. Cancel your Pro plan anytime from your settings with one click."
                }
              ].map((faq, i) => (
                <div key={i} className="glass-card p-8 rounded-2xl group cursor-pointer">
                  <details className="group">
                    <summary className="flex justify-between items-center list-none outline-none">
                      <span className="text-lg font-bold text-zinc-200">{faq.q}</span>
                      <ChevronDown className="w-5 h-5 text-zinc-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-6 text-zinc-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <Logo />
            <p className="text-zinc-500 max-w-sm text-sm">
              The Digital Bridge between Truth and Legality. Built for the Tactical Architect, the Steady Subcontractor, and the Overwhelmed Office Manager.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Product</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-qb-green transition-colors">Audit Shield</a></li>
              <li><a href="#" className="hover:text-qb-green transition-colors">QuickBooks Sync</a></li>
              <li><a href="#" className="hover:text-qb-green transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Legal</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-safety-orange transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-safety-orange transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-safety-orange transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
          <span>© 2024 LienFlow Inc.</span>
          <span>USPS & CASS Certified Integration</span>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-zinc-950/80 backdrop-blur-2xl border-t border-white/5 rounded-t-[2rem]">
        <button className="flex flex-col items-center gap-1 text-safety-orange">
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Dashboard</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <RefreshCcw className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Sync</span>
        </button>
        <div className="relative -top-8">
           <button className="w-16 h-16 bg-safety-orange rounded-full flex items-center justify-center shadow-2xl shadow-safety-orange/40 text-white">
              <Plus className="w-8 h-8" />
           </button>
        </div>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Settings</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <CreditCard className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Billing</span>
        </button>
      </nav>
    </div>
  );
}
