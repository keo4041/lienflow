import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const Calculator: React.FC = () => {
  const [wage, setWage] = useState(35);
  const [volume, setVolume] = useState(25);

  const annualLoss = useMemo(() => {
    // Assuming 45 minutes (0.75h) per manual notice
    const monthlyLoss = (volume * 0.75 * wage);
    return Math.floor(monthlyLoss * 12);
  }, [wage, volume]);

  const monthlyLossText = Math.floor(annualLoss / 12);

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="bg-surface-container-highest rounded-2xl p-8 lg:p-16 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-6 py-2 rounded-full font-black text-sm uppercase tracking-[0.2em]">
            The DIY "Kill Sheet" Calculator
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3 opacity-60">Avg. Admin Wage (${wage}/hr)</label>
                <input
                  className="w-full accent-secondary"
                  max="60"
                  min="15"
                  type="range"
                  value={wage}
                  onChange={(e) => setWage(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-sm font-bold mt-2"><span>$15</span><span>$35</span><span>$60</span></div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3 opacity-60">Monthly Notice Volume</label>
                <input
                  className="w-full bg-surface-container-lowest border-none focus:ring-2 ring-secondary p-4 rounded-md font-bold text-xl"
                  placeholder="25"
                  type="number"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="text-center p-8 bg-surface-container-lowest rounded-xl border-l-8 border-secondary shadow-lg">
              <p className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-on-surface-variant">Annual Loss Estimate</p>
              <motion.p
                key={annualLoss}
                initial={{ scale: 1.1, color: "#a23f00" }}
                animate={{ scale: 1, color: "#091d2e" }}
                className="text-6xl font-black tracking-tighter text-on-surface mb-2 leading-none"
              >
                ${annualLoss.toLocaleString()}
              </motion.p>
              <p className="text-sm font-semibold text-secondary mb-8">
                You are losing <span className="underline">${monthlyLossText.toLocaleString()}/month</span> by doing this yourself.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 safety-gradient text-white font-black uppercase tracking-widest rounded shadow-lg transition-shadow hover:shadow-xl"
              >
                Stop Losing Money
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
