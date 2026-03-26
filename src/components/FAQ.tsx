import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-surface-container-lowest p-6 rounded-lg cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-center font-black uppercase text-sm tracking-widest">
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="material-symbols-outlined"
        >
          expand_more
        </motion.span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Won't this upset my GC?",
      answer: "Actually, professional GCs prefer receiving preliminary notices early. It helps them manage their project funds and ensures that everyone down the line is protected. It's a sign of a well-organized subcontractor."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes. We hate long-term contracts as much as you do. You can switch between plans or cancel your subscription at any time without penalty."
    }
  ];

  return (
    <section className="py-24 px-6 bg-surface-container-low">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 text-center">Frequently Asked</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
