"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Bell, Settings, CreditCard, CheckCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function BillingPage() {
  const { user, profile } = useAuth();
  const [company, setCompany] = useState<any | null>(null);
  const [addingCredits, setAddingCredits] = useState(false);

  useEffect(() => {
    if (profile?.companyId) {
      const unsubscribe = onSnapshot(doc(db, "companies", profile.companyId), (snapshot) => {
        setCompany({ id: snapshot.id, ...snapshot.data() });
      });
      return unsubscribe;
    }
  }, [profile]);

  const handleAddCredits = async (amount: number) => {
    setAddingCredits(true);
    const functions = getFunctions();
    const addCredits = httpsCallable(functions, "addCredits");
    try {
      await addCredits({ amount });
    } catch (err) {
      console.error(err);
    } finally {
      setAddingCredits(false);
    }
  };

  if (!user || !company) return <div className="p-24 bg-[#131313] min-h-screen text-white">Loading...</div>;

  const plans = [
    { name: "Starter", price: "$0/mo", features: ["2 Users", "Daily Sync", "Basic AI Analysis", "$19.95 / notice"], current: true },
    { name: "Pro", price: "$99/mo", features: ["Unlimited Users", "Real-time Sync", "Forensic Analysis", "$16.95 / notice"], recommended: true }
  ];

  return (
    <div className="min-h-screen flex bg-[#131313] bg-[url(https://www.transparenttextures.com/patterns/carbon-fibre.png)] text-white font-inter">
       <aside className="w-64 border-r border-white/5 bg-[#201f1f]/50 backdrop-blur-xl p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold font-roboto-slab text-white mb-10">Lien<span className="text-qb-green">Flow™</span></h2>
        <nav className="flex flex-col gap-4">
          <div onClick={() => window.location.href="/dashboard"} className="flex items-center gap-3 p-3 text-white/60 hover:text-white transition-colors cursor-pointer">
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-white/60 hover:text-white transition-colors cursor-pointer">
            <FileText size={20} /> <span>Invoices</span>
          </div>
          <div onClick={() => window.location.href="/dashboard/notices"} className="flex items-center gap-3 p-3 text-white/60 hover:text-white transition-colors cursor-pointer">
            <Bell size={20} /> <span>Notices</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg text-qb-green border border-white/5">
            <CreditCard size={20} /> <span className="font-semibold">Billing</span>
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold font-roboto-slab">Subscription & Billing</h1>
          <p className="text-white/40">Manage your plan, credits, and payment methods.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
           <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {plans.map((plan, i) => (
                 <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`glass-panel p-8 rounded-2xl border-2 flex flex-col ${plan.recommended ? "border-safety-orange/40 bg-safety-orange/5" : "border-white/5 bg-white/5"}`}
                 >
                    {plan.recommended && <span className="px-3 py-1 bg-safety-orange text-white text-[10px] font-bold rounded-full w-fit mb-4 uppercase tracking-widest">Recommended</span>}
                    <h3 className="text-2xl font-bold font-roboto-slab mb-2">{plan.name}</h3>
                    <p className="text-4xl font-bold mb-6">{plan.price}</p>
                    <ul className="flex flex-col gap-3 mb-8 flex-1">
                       {plan.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-white/60 text-sm">
                             <CheckCircle size={14} className="text-qb-green" /> {f}
                          </li>
                       ))}
                    </ul>
                    <Button
                      variant={plan.current ? "outline" : "default"}
                      className={plan.current ? "border-white/10 text-white/40" : "bg-qb-green hover:bg-qb-green/90 text-white font-bold h-12 rounded-xl"}
                      disabled={plan.current}
                    >
                       {plan.current ? "Current Plan" : "Upgrade to Pro"}
                    </Button>
                 </motion.div>
              ))}
           </div>

           <div className="flex flex-col gap-6">
              <div className="glass-panel p-8 rounded-2xl bg-white/5 border-white/10 text-center">
                 <p className="text-white/40 text-sm uppercase font-bold tracking-widest mb-2">Available Credits</p>
                 <h2 className="text-5xl font-bold font-roboto-slab text-qb-green mb-8">{company.credits || 0}</h2>
                 <p className="text-xs text-white/20 mb-6 italic italic">"Credits never expire. One credit = One Certified Mail Notice."</p>
                 <Button
                    onClick={() => handleAddCredits(10)}
                    disabled={addingCredits}
                    className="w-full bg-safety-orange hover:bg-safety-orange/90 text-white font-bold h-12 rounded-xl shadow-xl"
                 >
                    {addingCredits ? "Processing..." : "Buy 10 Credits ($199.50)"}
                 </Button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
