"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LayoutDashboard, FileText, Bell, Settings, RefreshCw, AlertTriangle, ChevronRight, User, Send, CreditCard } from "lucide-react";

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [sendingNotice, setSendingNotice] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.companyId) {
      const q = query(
        collection(db, "invoices"),
        where("companyId", "==", profile.companyId),
        orderBy("syncAt", "desc"),
        limit(20)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setInvoices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
      return unsubscribe;
    }
  }, [profile]);

  const handleSync = async () => {
    setSyncing(true);
    const functions = getFunctions();
    const syncInvoices = httpsCallable(functions, "syncInvoices");
    try {
      await syncInvoices({ mock: true });
    } catch (err) {
      console.error("Sync failed:", err);
    } finally {
      setSyncing(false);
    }
  };

  const handleSendNotice = async (invoiceId: string) => {
    setSendingNotice(invoiceId);
    const functions = getFunctions();
    const sendNotice = httpsCallable(functions, "sendNotice");
    try {
      await sendNotice({ invoiceId });
    } catch (err) {
      console.error("Notice failed:", err);
    } finally {
      setSendingNotice(null);
    }
  };

  const getRiskColor = (score: number) => {
    if (score > 0.7) return "text-safety-orange border-safety-orange bg-safety-orange/20 shadow-[0_0_15px_rgba(255,103,0,0.3)] animate-pulse";
    if (score > 0.4) return "text-yellow-500 border-yellow-500 bg-yellow-500/20";
    return "text-qb-green border-qb-green bg-qb-green/20";
  };

  const getRiskExplanation = (flags: string[]) => {
    if (!flags || flags.length === 0) return "Zero risk detected.";
    return flags.map(f => f.replace(/_/g, " ")).join(", ") + " detected.";
  };

  if (!user) return <div className="p-24 bg-[#131313] min-h-screen text-white">Loading...</div>;

  return (
    <div className="min-h-screen flex bg-[#131313] bg-[url(https://www.transparenttextures.com/patterns/carbon-fibre.png)] text-white font-inter">
      <aside className="w-64 border-r border-white/5 bg-[#201f1f]/50 backdrop-blur-xl p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold font-roboto-slab text-white mb-10">Lien<span className="text-qb-green">Flow™</span></h2>
        <nav className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg text-qb-green border border-white/5">
            <LayoutDashboard size={20} /> <span className="font-semibold">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-white/60 hover:text-white transition-colors cursor-pointer">
            <FileText size={20} /> <span>Invoices</span>
          </div>
          <div onClick={() => window.location.href="/dashboard/notices"} className="flex items-center gap-3 p-3 text-white/60 hover:text-white transition-colors cursor-pointer">
            <Bell size={20} /> <span>Notices</span>
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
        <header className="flex justify-between items-center mb-10">
          <div className="flex gap-4 items-center">
             <div className="md:hidden p-2 bg-white/5 rounded-lg mr-2"><LayoutDashboard size={24} /></div>
             <div>
              <h1 className="text-3xl font-bold font-roboto-slab">Operational Overview</h1>
              <p className="text-white/40">Real-time status of your construction receivables.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={handleSync}
              disabled={syncing}
              className="bg-safety-orange hover:bg-safety-orange/90 text-white font-bold h-12 px-6 rounded-xl shadow-[0_0_20px_rgba(255,103,0,0.3)] transition-transform hover:scale-105 active:scale-95"
            >
              <RefreshCw className={`mr-2 h-5 w-5 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing..." : "Sync QuickBooks"}
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Invoices", value: invoices.length, icon: <FileText className="text-qb-green" /> },
            { label: "Pending Notices", value: "0", icon: <Bell className="text-safety-orange" /> },
            { label: "Exposure Score", value: "92%", icon: <AlertTriangle className="text-white" /> },
            { label: "Risk Alerts", value: invoices.filter(i => i.riskScore > 0.7).length, icon: <AlertTriangle className="text-safety-orange" /> }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl bg-white/5 border-white/10"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-white/40 uppercase tracking-wider">{card.label}</span>
                {card.icon}
              </div>
              <div className="text-3xl font-bold font-roboto-slab">{card.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-safety-orange/20 to-transparent border border-safety-orange/20 flex justify-between items-center group cursor-pointer hover:border-safety-orange/40 transition-colors">
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-safety-orange/20 rounded-xl text-safety-orange"><AlertTriangle /></div>
            <div>
              <h3 className="font-bold text-lg">System Health Check</h3>
              <p className="text-white/60">Secure your payment for {invoices.find(i => i.riskScore > 0.7)?.customerName || "pending jobs"} before 48h deadline.</p>
            </div>
          </div>
          <ChevronRight className="text-white/20 group-hover:text-safety-orange transition-colors" />
        </div>

        <div className="glass-panel rounded-2xl bg-white/5 border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-bold font-roboto-slab">Recent Invoices</h3>
            <button className="text-qb-green font-bold text-sm">VIEW ALL</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-white/40 text-sm uppercase tracking-wider border-b border-white/5">
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Risk Score</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg text-white/40 group-hover:bg-qb-green/10 group-hover:text-qb-green transition-colors"><User size={16} /></div>
                        <div>
                          <div className="font-bold">{inv.customerName}</div>
                          <div className="text-xs text-white/40">Inv #{inv.qbId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-lg">
                      ${inv.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {inv.linkedNoticeId ? (
                         <span className="px-3 py-1 bg-qb-green/20 text-qb-green rounded-full text-[10px] font-bold uppercase tracking-widest border border-qb-green/30">
                          Notice Sent
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-white/5 text-white/40 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                          Synced
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border w-fit ${getRiskColor(inv.riskScore)}`}>
                          RISK {inv.riskScore.toFixed(2)}
                        </span>
                        <p className="text-[10px] text-white/20 font-medium max-w-[150px] leading-tight group-hover:text-white/40 transition-colors">
                          {getRiskExplanation(inv.riskFlags)}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       {!inv.linkedNoticeId && (
                          <Button
                            onClick={() => handleSendNotice(inv.id)}
                            disabled={sendingNotice === inv.id}
                            className="bg-white/5 hover:bg-qb-green hover:text-white text-white/40 border border-white/10 rounded-xl transition-all h-10 w-10 p-0"
                          >
                            {sendingNotice === inv.id ? <RefreshCw className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
                          </Button>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
