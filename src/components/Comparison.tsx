import React from 'react';
import { motion } from 'framer-motion';

const Comparison: React.FC = () => {
  return (
    <section className="bg-surface-container-low py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase mb-4">The Cost of Staying Analog</h2>
          <p className="text-on-surface-variant font-semibold">Your office manager's time is worth more than paperwork.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-2xl">
          {/* The Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-surface-dim p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-9xl absolute -bottom-10 -left-10 rotate-12">warning</span>
            </div>
            <h3 className="text-2xl font-black uppercase mb-8 text-on-surface-variant">The Old Way</h3>
            <ul className="space-y-6">
              {[
                { title: 'Manual Data Entry', desc: 'Hand-writing green cards and certified mail labels.' },
                { title: 'The Post Office Run', desc: '30 minutes in line for every batch of notices.' },
                { title: 'Tracking Blind Spots', desc: 'Losing certified receipts in overflowing filing cabinets.' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-error mt-1">close</span>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm opacity-70">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-12 rounded-lg overflow-hidden border border-on-surface/5 grayscale contrast-125">
              <img
                alt="Chaotic Office"
                className="w-full opacity-60"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwSY7Iv63s_8baqrRUhDC_jVT5OtQWxnrKNBLUIAZ-8hbRESyEjd1MYzxvo765o67MTuLsupyFFl_5-R73wYyhVrg4yaiRrYxlkGbx0qNtGgR60GA_D6p7f79H8L3e8GRSUui4JXHcGcYG7rnBdXCtnY2TwzjJo5AgOngklHqdvUPABh8-ijTpDjy0DB_j18oMrfyracYA2Zc-DXyhOU0nKQEtkzrsnXb2KFXQMwVaAHaxKGPr6vxrIlbVd5wD6MM1gTG9L4mFZwQ"
              />
            </div>
          </motion.div>

          {/* The LienFlow Way */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-surface-container-lowest p-12 border-l-4 border-primary relative"
          >
            <div className="absolute top-8 right-8">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">Verified Efficiency</span>
            </div>
            <h3 className="text-2xl font-black uppercase mb-8 text-primary">The LienFlow Way</h3>
            <ul className="space-y-6">
              {[
                { title: 'Auto-Sync Invoices', desc: 'Invoices over $2,500 automatically trigger a notice draft.' },
                { title: '1-Click Dispatch', desc: 'Approve notices from your phone at the job site.' },
                { title: 'Zero-Trust Verification', desc: 'Every address cross-checked against CASS/USPS databases.' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm opacity-70">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-12 rounded-lg overflow-hidden shadow-lg">
              <img
                alt="Clean Interface"
                className="w-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBozDLSy4Fw60dY4Lz-CElaiT0u1cS06pSJtzsRDQipzKPR2_m1ZX6uRRFh6hJ-j3oBe5HUpdJyDzDVbB-NUI29TOlJn7t3g7yMOTzemdDoALQE54Asq4NU3NMIdRqLDTTeBCbWSXnym6HGJ9SAjLGItRoCD24nfHmtGU1N-rS1Cz3VV8Y2kYTbbXk-JA9nPetsxgY1MjolllLupJQBw5cGuiNOF7lgpem2s8oiF3avx4M8QZHLQQz4Cw1RCpIMlLJkHAjqvuP5z0M"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
