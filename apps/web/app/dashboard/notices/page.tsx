"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { LayoutDashboard, FileText, Bell, Settings, ExternalLink, MapPin, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function NoticesPage() {
  const { user, profile } = useAuth();
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    if (profile?.companyId) {
      const q = query(
        collection(db, "notices"),
        where("companyId", "==", profile.companyId),
        orderBy("sentAt", "desc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return unsubscribe;
    }
  }, [profile]);

  if (!user) return <div className="p-24 bg-[#131313] min-h-screen text-white">Loading...</div>;

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
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg text-safety-orange border border-white/5">
            <Bell size={20} /> <span className="font-semibold">Notices</span>
          </div>
          <div onClick={() => window.location.href="/dashboard/billing"} className="flex items-center gap-3 p-3 text-white/60 hover:text-white transition-colors cursor-pointer">
            <CreditCard size={20} /> <span>Billing</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-white/60 hover:text-white transition-colors mt-auto cursor-pointer">
            <Settings size={20} /> <span>Settings</span>
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold font-roboto-slab">Certified Mail Tracking</h1>
          <p className="text-white/40">Monitor the legal status and delivery of your preliminary notices.</p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {notices.map((notice, i) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl bg-white/5 border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div className="flex gap-4 items-center flex-1">
                <div className="p-4 bg-qb-green/10 rounded-xl text-qb-green"><Bell /></div>
                <div>
                  <h3 className="font-bold text-lg">{notice.customerName}</h3>
                  <p className="text-white/40 text-sm">Notice of Intent to Lien | ID: {notice.lobTrackingId}</p>
                </div>
              </div>

              <div className="flex gap-8 items-center flex-1 justify-center">
                 <div className="text-center">
                    <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1">Status</p>
                    <span className="px-3 py-1 bg-qb-green/20 text-qb-green rounded-full text-xs font-bold uppercase border border-qb-green/30">
                      {notice.status}
                    </span>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1">Amount</p>
                    <p className="font-bold">${notice.amount.toLocaleString()}</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1">Sent</p>
                    <p className="font-mono text-white/60 text-xs">{notice.sentAt?.toDate().toLocaleDateString() || "Today"}</p>
                 </div>
              </div>

              <div className="flex gap-3">
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 text-white/60 hover:text-white">
                  <ExternalLink size={18} />
                </button>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 text-white/60 hover:text-white">
                  <MapPin size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
