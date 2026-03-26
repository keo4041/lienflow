import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 z-50 w-full flex justify-between items-center px-6 py-4 glass-panel border-none shadow-none"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl font-black text-on-surface dark:text-white uppercase tracking-tighter">LienFlow</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onLoginClick}
          className="px-4 py-2 font-headline font-bold tracking-tight text-on-surface opacity-70 hover:opacity-100 transition-opacity"
        >
          Log In
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-md safety-gradient text-white font-headline font-bold tracking-tight shadow-lg"
        >
          Sync with QuickBooks
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
