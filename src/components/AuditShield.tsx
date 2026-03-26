import React from 'react';
import { motion } from 'framer-motion';

const AuditShield: React.FC = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black">
            <motion.div
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-1 bg-primary z-20 shadow-[0_0_15px_rgba(8,107,0,1)]"
            />
            <img
              alt="Forensic Scan"
              className="w-full brightness-75 grayscale hover:grayscale-0 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8rR3zPQVf3VkeEx0Rn9WH66AgNqWiiAsPFl39c-AxV9dj8EQjdnFlW-U6EnS0_yxEPfd9xCqTfFFYyhqrFrU5np-EOTHvDHPYm7SgTEssHwv4L_j7eUtabQ6yvgy7OJKUGFF27qq59yAiZ8Wt_aIKdgMaKzPhnk7IctcDbBAY_t_gF-vyltQS-doN0j1BRIIUhJtI2b3FXWuc-Bdu1hUfAg0zEYIhO4HRMdD7YwoB7Q6ye_QAbdyGc56dmojJGTAJKJg-mnbLR38"
            />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none mb-6">
              Forensic Accounting for Your <span className="text-primary">Job Site.</span>
            </h2>
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
              Our Zero-Trust Engine doesn't just mail papers; it acts as a digital shield. We cross-verify property owners, legal descriptions, and general contractors against official county records to ensure your lien rights are ironclad.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-surface-container-low p-6 rounded"
              >
                <span className="material-symbols-outlined text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                <p className="font-black uppercase text-xs tracking-widest">Audit Shield</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-surface-container-low p-6 rounded"
              >
                <span className="material-symbols-outlined text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <p className="font-black uppercase text-xs tracking-widest">Address Lock</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuditShield;
