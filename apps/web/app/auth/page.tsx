"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Mail,
  Key,
  ArrowRight,
  Lock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronRight,
  Fingerprint
} from "lucide-react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { fadeIn, staggerContainer, glassmorphismVariants } from "@/lib/animations";

const Logo = () => (
  <div className="flex items-center gap-3 group">
    <div className="relative">
      <div className="w-10 h-10 bg-qb-green rounded-lg flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform">
        <Shield className="text-white w-6 h-6" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-safety-orange rounded-md flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
        <Mail className="text-white w-4 h-4" />
      </div>
    </div>
    <span className="text-2xl font-black font-roboto-slab tracking-tight text-white">
      Lien<span className="text-qb-green">Flow</span>
    </span>
  </div>
);

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickBooksSync = () => {
    // In a real app, this would trigger the OAuth flow
    // For now, we'll simulate a secure redirect
    setLoading(true);
    setTimeout(() => {
       window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#131313] carbon-texture text-white flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-qb-green/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-safety-orange/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="absolute top-0 w-full flex items-center justify-between px-8 py-8 md:px-16 pointer-events-none">
        <div className="pointer-events-auto">
          <a href="/"><Logo /></a>
        </div>
        <div className="hidden md:flex items-center gap-4 opacity-40">
          <Fingerprint className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Security Protocol V.4.0</span>
        </div>
      </header>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Meta */}
        <motion.div variants={fadeIn} className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 mb-6 group">
            <Lock className="text-qb-green w-8 h-8 group-hover:scale-110 transition-transform" />
          </div>
          <h2 className="font-roboto-slab text-4xl font-bold mb-2 italic">The Secure Bridge</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-qb-green">Architectural Lien Management</p>
        </motion.div>

        {/* Primary Sync CTA */}
        <motion.div variants={fadeIn} className="mb-8">
          <button
            onClick={handleQuickBooksSync}
            disabled={loading}
            className="w-full btn-primary h-16 text-lg group relative overflow-hidden"
          >
            <Zap className="w-5 h-5 group-hover:animate-pulse" />
            Sync with QuickBooks
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <p className="text-center mt-4 text-xs text-zinc-500 font-medium leading-relaxed max-w-[280px] mx-auto">
            Connect your QuickBooks account to start automating your notices in seconds.
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          variants={fadeIn}
          className="glass-card rounded-[2rem] border-white/10 overflow-hidden shadow-2xl"
        >
          {/* Tabs */}
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${
                mode === "login"
                ? "text-safety-orange border-b-2 border-safety-orange bg-safety-orange/5"
                : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${
                mode === "signup"
                ? "text-safety-orange border-b-2 border-safety-orange bg-safety-orange/5"
                : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                Corporate Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@firm.com"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:border-qb-green outline-none transition-all"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Access Key
                </label>
                {mode === "login" && (
                  <a href="#" className="text-[10px] font-black uppercase tracking-tighter text-qb-green hover:underline">Recovery</a>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:border-qb-green outline-none transition-all"
                />
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-5 h-5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-orange h-14 text-md flex items-center justify-center gap-2 group"
            >
              {loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {error && (
              <p className="text-red-500 text-[10px] font-bold text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                {error}
              </p>
            )}

            {/* Security Meta */}
            <div className="flex items-center justify-center gap-2 pt-4 opacity-30">
              <ShieldCheck className="w-3 h-3 text-qb-green" />
              <span className="text-[10px] font-black uppercase tracking-widest">AES-256 Encrypted Tunnel</span>
            </div>
          </form>
        </motion.div>

        {/* Footer Meta */}
        <motion.div
          variants={fadeIn}
          className="mt-12 flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-600"
        >
          <a href="#" className="hover:text-qb-green transition-colors">Privacy Charter</a>
          <div className="w-1 h-1 bg-zinc-800 rounded-full my-auto" />
          <a href="#" className="hover:text-qb-green transition-colors">Network Status</a>
          <div className="w-1 h-1 bg-zinc-800 rounded-full my-auto" />
          <a href="#" className="hover:text-qb-green transition-colors">Legal Framework</a>
        </motion.div>
      </motion.div>

      {/* Mobile Security Footer */}
      <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-[#131313]/60 backdrop-blur-2xl md:hidden border-t border-white/5">
        <div className="flex flex-col items-center gap-1 opacity-40">
          <Lock className="w-4 h-4" />
          <span className="text-[8px] font-black uppercase tracking-widest">Secure</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <Shield className="w-4 h-4" />
          <span className="text-[8px] font-black uppercase tracking-widest">Privacy</span>
        </div>
      </footer>
    </div>
  );
}
