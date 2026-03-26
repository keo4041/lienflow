import React from 'react';
import { motion } from 'framer-motion';

const SocialProof: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-inverse-surface text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase leading-none">
            Why Subcontractors are Leaving <br/>
            <span className="text-primary-fixed">SunRay & Levelset.</span>
          </h2>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-4 text-xs font-black uppercase tracking-[0.2em] opacity-50">Feature</th>
                <th className="py-6 px-4 text-xs font-black uppercase tracking-[0.2em] opacity-50">Competitors</th>
                <th className="py-6 px-4 text-xs font-black uppercase tracking-[0.2em] text-primary-fixed">LienFlow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { label: 'Deep QuickBooks Sync', competitor: 'CSV Export Only', lienflow: '2-Way Native' },
                { label: 'Contract Lock-In', competitor: 'Annual Subscriptions', lienflow: 'Cancel Anytime' },
                { label: 'Price per Notice', competitor: '$35 - $45', lienflow: 'From $19.95' }
              ].map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <td className="py-8 px-4 font-bold">{row.label}</td>
                  <td className="py-8 px-4 opacity-40">{row.competitor}</td>
                  <td className="py-8 px-4 font-black text-primary-fixed flex items-center gap-2">
                    <span className="material-symbols-outlined">check_circle</span> {row.lienflow}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
