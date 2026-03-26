import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative px-6 py-20 lg:py-32 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <span className="inline-block px-3 py-1 mb-6 text-xs font-black uppercase tracking-widest bg-surface-container-highest text-primary rounded-full">
            Automated Compliance
          </span>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-on-surface mb-6">
            Turn QuickBooks Invoices into <span className="text-primary">Certified Mail</span> in One Click.
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
            Stop driving to the Post Office. We auto-detect jobs, verify addresses with USPS, and mail your Preliminary Notices for less than the cost of a stamp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: ["0px 0px 0px 0px rgba(8, 107, 0, 0.4)", "0px 0px 0px 20px rgba(8, 107, 0, 0)"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="px-8 py-5 rounded-md ironclad-gradient text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:brightness-110 transition-all"
            >
              Start Free Trial (Sync QuickBooks)
              <span className="material-symbols-outlined">arrow_forward</span>
            </motion.button>
          </div>
          <div className="flex flex-wrap gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Official QuickBooks Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <span className="text-[10px] font-black uppercase tracking-widest">CASS-Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_post_office</span>
              <span className="text-[10px] font-black uppercase tracking-widest">USPS Compatible</span>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            style={{ y: y1 }}
            className="aspect-square bg-surface-container rounded-full absolute -top-12 -right-12 w-full blur-3xl opacity-50"
          />
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-surface-container-lowest p-4 rounded-xl shadow-2xl overflow-hidden"
          >
            <img
              alt="LienFlow Dashboard"
              className="rounded-lg w-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALxDHYGagZokHmlkuPUiqhPO3e6RjiEN0ifTDpM7HWQeCU5lUn1rdeYrRd0x_ER6e4It8l4RceWdceQ9fEzTWyi2IV9EJXUj_ku60GoM6gNWpq0gBXq9BwsnoBVH5cug4vhPQkYG317eh83zRgz-noUKpZiOkPOZMJdnGwDJbGSn2gIQYHglrBaa9sB_OXoFECCWjZKNv00w18oshZ1oRrQWz9pbHFxtieMIjzMvJ0DgTMJXDwjcu5_40SKSlWKrl2iAyncMS--Ls"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
