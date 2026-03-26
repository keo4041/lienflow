"use client";

import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Zap, Mail, ChevronRight, BarChart3, Receipt } from "lucide-react";
import { KillSheetCalculator } from "@/components/marketing/KillSheetCalculator";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const features = [
    { title: "One-Click Sync", description: "Deep QuickBooks integration. Zero manual entry.", icon: <Zap className="text-qb-green" /> },
    { title: "Audit Shield Protection", description: "Zero-Trust engine catches errors before they mail.", icon: <ShieldCheck className="text-safety-orange" /> },
    { title: "CASS Address Check", description: "USPS-verified addresses for 100% legal delivery.", icon: <BarChart3 className="text-white" /> },
    { title: "Certified Mail Dispatch", description: "We mail it for less than the cost of a stamp.", icon: <Mail className="text-qb-green" /> }
  ];

  return (
    <main className="min-h-screen bg-[#131313] bg-[url(https://www.transparenttextures.com/patterns/carbon-fibre.png)] text-white font-inter selection:bg-safety-orange/30">
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5 bg-[#131313]/50 backdrop-blur-xl p-4 flex justify-between items-center px-8 md:px-16">
        <h2 className="text-2xl font-bold font-roboto-slab text-white tracking-tight">Lien<span className="text-qb-green">Flow™</span></h2>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" className="text-white/60 hover:text-white" onClick={() => window.location.href="/auth/signin"}>Log In</Button>
          <Button className="bg-safety-orange hover:bg-safety-orange/90 text-white font-bold h-11 px-6 rounded-xl shadow-[0_0_20px_rgba(255,103,0,0.3)]" onClick={() => window.location.href="/auth/signin"}>
            Sync with QuickBooks
          </Button>
        </div>
      </header>
      <section className="pt-24 pb-16 px-8 text-center max-w-5xl mx-auto flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Official QuickBooks Partner</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-7xl font-bold font-roboto-slab leading-tight mb-8">Turn QuickBooks Invoices into <span className="text-qb-green">Certified Mail</span> in One Click.</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl leading-relaxed">Stop driving to the Post Office. We auto-detect jobs, verify addresses with USPS, and mail your Preliminary Notices for less than the cost of a stamp.</motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-lg mb-12">
           <Button className="flex-1 bg-qb-green hover:bg-qb-green/90 text-white font-bold h-16 rounded-2xl text-xl shadow-xl" onClick={() => window.location.href="/auth/signin"}>Start Free Trial (Sync QB)</Button>
           <Button variant="outline" className="flex-1 border-white/10 text-white/60 hover:bg-white/5 h-16 rounded-2xl text-xl" onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}>Calculate My Loss</Button>
        </motion.div>
      </section>
      <KillSheetCalculator />
    </main>
  );
}
