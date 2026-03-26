"use client";

import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, Calculator } from "lucide-react";

export function KillSheetCalculator() {
  const [email, setEmail] = useState("");
  const [wage, setWage] = useState(45);
  const [volume, setVolume] = useState(20);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const functions = getFunctions();
    const calculateLoss = httpsCallable(functions, "calculateLoss");
    try {
      const res = await calculateLoss({ email, hourlyWage: wage, volume });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="calculator" className="py-24 max-w-4xl mx-auto w-full px-6 text-white">
      <div className="glass-panel p-12 rounded-3xl bg-white/5 border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-safety-orange/10"><Calculator size={120} /></div>
        <h2 className="text-4xl font-bold font-roboto-slab mb-4">The DIY "Kill Sheet" Calculator</h2>
        <p className="text-white/40 mb-10 max-w-xl mx-auto italic text-sm">Stop driving to the Post Office. Calculate how much money you are losing by mailing notices yourself.</p>
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleCalculate} className="flex flex-col gap-8 max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-6 text-left">
                 <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Hourly Wage ($)</label>
                    <input type="number" value={wage} onChange={(e) => setWage(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-xl font-bold outline-none focus:border-safety-orange" />
                 </div>
                 <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Monthly Notices</label>
                    <input type="number" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-xl font-bold outline-none focus:border-safety-orange" />
                 </div>
              </div>
              <div className="text-left">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Email Address (To see result)</label>
                 <input type="email" placeholder="owner@construction.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-lg outline-none focus:border-safety-orange" required />
              </div>
              <Button type="submit" disabled={loading} className="bg-safety-orange hover:bg-safety-orange/90 text-white font-bold h-14 rounded-2xl text-lg shadow-xl">
                {loading ? "Calculating..." : "Calculate My Loss"}
              </Button>
            </motion.form>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
               <div className="p-4 bg-red-500/20 text-red-500 rounded-full mb-6"><TrendingDown size={40} /></div>
               <h3 className="text-5xl font-bold font-roboto-slab text-red-500 mb-2">-${result.monthlyLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</h3>
               <p className="text-xl text-white/60 mb-10 text-sm">You are losing money every single month doing this yourself.</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12 text-left">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-[10px] text-white/40 font-bold uppercase mb-2 tracking-widest">Manual DIY Cost</p>
                     <p className="text-2xl font-bold">${result.monthlyDiyCost.toLocaleString()}</p>
                  </div>
                  <div className="p-6 bg-qb-green/10 rounded-2xl border border-qb-green/20">
                     <p className="text-[10px] text-qb-green/60 font-bold uppercase mb-2 tracking-widest">LienFlow Cost</p>
                     <p className="text-2xl font-bold text-qb-green">${result.monthlyLienFlowCost.toLocaleString()}</p>
                  </div>
               </div>
               <Button onClick={() => window.location.href="/auth/signin"} className="bg-qb-green hover:bg-qb-green/90 text-white font-bold h-14 px-10 rounded-2xl text-lg shadow-xl">Stop Losing Money – Start Free Trial</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
