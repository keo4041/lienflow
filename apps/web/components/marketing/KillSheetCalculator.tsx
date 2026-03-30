"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, Calculator, ArrowRight } from "lucide-react";
import { glassmorphismVariants } from "@/lib/animations";

export function KillSheetCalculator() {
  const [wage, setWage] = useState(45);
  const [volume, setVolume] = useState(20);
  const [showResult, setShowResult] = useState(false);

  const monthlyDiyCost = (volume * 0.5 * wage) + (volume * 8.86);
  const monthlyLienFlowCost = volume * 19.95;
  const monthlyLoss = monthlyDiyCost - monthlyLienFlowCost;

  return (
    <section id="calculator" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="glass-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden"
          variants={glassmorphismVariants}
          whileHover="hover"
        >
          <div className="absolute top-0 right-0 p-8 text-safety-orange/5 pointer-events-none">
            <Calculator size={160} />
          </div>

          <div className="text-center mb-12">
            <h2 className="font-roboto-slab text-4xl md:text-5xl font-bold mb-4">The DIY "Kill Sheet"</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Stop driving to the Post Office. Calculate exactly how much money you are losing by mailing notices yourself.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 max-w-md mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Hourly Wage ($)</label>
                    <input
                      type="number"
                      value={wage}
                      onChange={(e) => setWage(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-2xl font-bold focus:border-safety-orange outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Monthly Notices</label>
                    <input
                      type="number"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-2xl font-bold focus:border-safety-orange outline-none transition-colors"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setShowResult(true)}
                  className="btn-orange w-full text-lg h-16 flex items-center justify-center gap-2 group"
                >
                  Calculate My Loss
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="inline-flex p-4 bg-red-500/10 text-red-500 rounded-full mb-2">
                  <TrendingDown size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-5xl md:text-6xl font-roboto-slab font-black text-red-500">
                    -${monthlyLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                  </h3>
                  <p className="text-zinc-400 font-medium">You are losing money every single month doing this yourself.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Manual DIY Cost</p>
                    <p className="text-2xl font-bold">${monthlyDiyCost.toLocaleString()}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-qb-green/10 border border-qb-green/20 text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-qb-green/60 mb-1">LienFlow Cost</p>
                    <p className="text-2xl font-bold text-qb-green">${monthlyLienFlowCost.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
                  <button
                    onClick={() => setShowResult(false)}
                    className="btn-secondary h-16"
                  >
                    Adjust Numbers
                  </button>
                  <button
                    onClick={() => window.location.href="/auth"}
                    className="btn-primary h-16 text-lg"
                  >
                    Stop Losing Money – Start Trial
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
