import React from 'react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onBackToHome: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      {/* Top Navigation Bar */}
      <header className="w-full fixed top-0 left-0 z-50 bg-surface border-b border-surface-container-low">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
          <div
            className="text-2xl font-black tracking-tighter text-on-surface cursor-pointer"
            onClick={onBackToHome}
          >
            LienFlow
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-on-surface/70 font-bold uppercase text-[0.75rem] tracking-wider hover:text-primary transition-colors">
              Support
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-[1100px] grid md:grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-2xl">
          {/* Visual Brand Side */}
          <div className="hidden md:flex flex-col justify-between p-12 bg-on-background relative overflow-hidden">
            <div className="z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-on-primary text-[0.7rem] font-black uppercase tracking-widest rounded-full mb-8">
                <span className="material-symbols-outlined text-[1rem]">verified_user</span>
                Digital Truth
              </span>
              <h1 className="text-surface font-black text-5xl leading-tight tracking-[-0.04em] mb-6">
                The Ironclad Ledger for Construction Finance.
              </h1>
              <p className="text-surface-variant text-lg leading-relaxed max-w-md opacity-80">
                Precision auditing meets rugged reliability. Secure your project funding with LienFlow's automated verification engine.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="z-10 flex gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              <div className="flex flex-col gap-1 items-center">
                <span className="material-symbols-outlined text-4xl text-surface">security</span>
                <span className="text-[10px] text-surface font-bold uppercase tracking-widest">SOC2 TYPE II</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="material-symbols-outlined text-4xl text-surface">account_balance</span>
                <span className="text-[10px] text-surface font-bold uppercase tracking-widest">FDIC INSURED</span>
              </div>
            </div>

            {/* Abstract Visual Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-secondary rounded-full blur-[100px]"></div>
            </div>
          </div>

          {/* Login Content Side */}
          <div className="bg-surface-container-lowest p-8 md:p-16 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <header className="mb-10">
                <h2 className="text-on-surface font-extrabold text-3xl tracking-tight mb-2">Welcome Back to the Ironclad Ledger.</h2>
                <p className="text-on-surface-variant text-sm">Access your secure dashboard and sync live project data.</p>
              </header>

              {/* Primary Action: QuickBooks */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-14 ironclad-gradient text-on-primary rounded-md font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition-all"
                >
                  <span className="material-symbols-outlined">sync</span>
                  Login with QuickBooks
                </motion.button>
              </div>

              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant opacity-30"></div>
                </div>
                <div className="relative flex justify-center text-[0.7rem] font-black uppercase tracking-[0.2em] text-on-surface-variant bg-surface-container-lowest px-4">
                  Or use local credentials
                </div>
              </div>

              {/* Standard Login Form */}
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="group">
                  <label className="block text-[0.7rem] font-black uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Work Email</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <input
                      className="w-full h-14 bg-surface-container-low border-none rounded-md px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="name@company.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between items-center mb-2 ml-1">
                    <label className="text-[0.7rem] font-black uppercase tracking-widest text-on-surface-variant">Security Code</label>
                    <a className="text-[0.65rem] font-bold text-primary hover:underline uppercase tracking-wider" href="#">Forgot Password?</a>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <input
                      className="w-full h-14 bg-surface-container-low border-none rounded-md px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  className="w-full h-14 border-2 border-primary text-primary font-black uppercase tracking-widest text-sm rounded-md transition-colors flex items-center justify-center gap-2"
                  type="submit"
                >
                  Secure Sign In
                  <span className="material-symbols-outlined text-[1.2rem]">arrow_forward</span>
                </motion.button>
              </form>

              <footer className="mt-12 text-center">
                <p className="text-sm text-on-surface-variant">
                  Don't have an account?
                  <a className="text-primary font-bold hover:underline ml-1" href="#">Start your free trial</a>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Cluster */}
      <footer className="w-full border-t border-surface-container-low bg-surface mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-7xl mx-auto">
          <div className="text-[0.75rem] font-bold uppercase tracking-wider text-on-surface/50">
            © 2024 LienFlow. Ironclad Security for Construction Finance.
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="text-[0.75rem] font-bold uppercase tracking-wider text-on-surface/50 hover:text-primary underline transition-all">Privacy Policy</a>
            <a href="#" className="text-[0.75rem] font-bold uppercase tracking-wider text-on-surface/50 hover:text-primary underline transition-all">Terms of Service</a>
            <a href="#" className="text-[0.75rem] font-bold uppercase tracking-wider text-on-surface/50 hover:text-primary underline transition-all">Security Audit</a>
            <a href="#" className="text-[0.75rem] font-bold uppercase tracking-wider text-on-surface/50 hover:text-primary underline transition-all">QuickBooks Integration</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
