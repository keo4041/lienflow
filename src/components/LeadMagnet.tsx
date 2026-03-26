import React from 'react';
import { motion } from 'framer-motion';

const LeadMagnet: React.FC = () => {
  const resources = [
    {
      icon: 'picture_as_pdf',
      title: 'Postage Inflation PDF',
      desc: 'Save 40% on mailing costs.'
    },
    {
      icon: 'map',
      title: 'Notice-to-Owner Cheat Sheet',
      desc: 'State-by-state deadline map.'
    }
  ];

  return (
    <section className="py-20 px-6 bg-primary-container text-on-primary-container">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black tracking-tighter mb-4">Master the Notice Game.</h2>
          <p className="font-bold opacity-80 uppercase tracking-widest text-xs">Free resources for our partners.</p>
        </motion.div>
        <div className="flex flex-wrap gap-4">
          {resources.map((res, i) => (
            <motion.a
              key={i}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="bg-white/10 p-6 rounded-xl border border-white/20 transition-all flex items-center gap-4 group"
            >
              <span className="material-symbols-outlined text-3xl">{res.icon}</span>
              <div>
                <p className="font-black uppercase text-xs tracking-widest">{res.title}</p>
                <p className="text-sm opacity-70">{res.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
