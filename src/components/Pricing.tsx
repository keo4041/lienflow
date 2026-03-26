import React from 'react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase">Transparent Pricing</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pay As You Go */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-surface-container-low p-10 rounded-xl relative group"
          >
            <h3 className="text-xl font-black uppercase mb-2">Pay-As-You-Go</h3>
            <p className="text-on-surface-variant mb-8 font-medium">For small crews and one-off jobs.</p>
            <div className="mb-8">
              <span className="text-5xl font-black tracking-tighter">$24.95</span>
              <span className="text-on-surface-variant font-bold">/notice</span>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 font-semibold text-sm">
                <span className="material-symbols-outlined text-primary">done</span> No Monthly Fee
              </li>
              <li className="flex items-center gap-3 font-semibold text-sm">
                <span className="material-symbols-outlined text-primary">done</span> USPS Tracking Included
              </li>
            </ul>
            <button className="w-full py-4 border-2 border-on-surface text-on-surface font-black uppercase tracking-widest rounded hover:bg-on-surface hover:text-surface transition-colors">
              Choose Basic
            </button>
          </motion.div>

          {/* Pro Subscription */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-surface-container-highest p-10 rounded-xl border-4 border-primary relative"
          >
            <div className="absolute -top-4 right-8 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Recommended
            </div>
            <h3 className="text-xl font-black uppercase mb-2">Pro Subscription</h3>
            <p className="text-on-surface-variant mb-8 font-medium">For growing firms sync'd with QB.</p>
            <div className="mb-8">
              <span className="text-5xl font-black tracking-tighter">$19.95</span>
              <span className="text-on-surface-variant font-bold">/notice</span>
              <div className="mt-2 text-xs font-black text-primary uppercase">+ $99/mo PLATFORM FEE</div>
            </div>
            <div className="mb-8 bg-white/50 p-4 rounded border border-primary/20">
              <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Cost Comparison</p>
              <p className="text-sm font-bold">Cheaper than DIY ($21.36 total internal cost)</p>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 font-semibold text-sm">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> Unlimited QuickBooks Sync
              </li>
              <li className="flex items-center gap-3 font-semibold text-sm">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> Bulk Approval Queue
              </li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 ironclad-gradient text-white font-black uppercase tracking-widest rounded shadow-xl"
            >
              Get Started Pro
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
