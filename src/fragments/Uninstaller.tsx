import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, StatusBadge } from '../components/UI';
import { Trash2, ArrowLeft, Package, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Uninstaller({ onBack }: { onBack: () => void }) {
  const [apps, setApps] = useState([
    { id: '1', name: 'Legacy Browser', size: '450 MB', lastUsed: '3 months ago', icon: Package, color: 'red' },
    { id: '2', name: 'Old Game Tool', size: '1.2 GB', lastUsed: '6 months ago', icon: Package, color: 'orange' },
    { id: '3', name: 'Trial Editor', size: '890 MB', lastUsed: '1 month ago', icon: Package, color: 'purple' },
    { id: '4', name: 'Unused Utility', size: '120 MB', lastUsed: 'Never', icon: Package, color: 'cyan' },
    { id: '5', name: 'Demo App', size: '65 MB', lastUsed: '2 months ago', icon: Package, color: 'red' },
    { id: '6', name: 'Temp Cleaner', size: '210 MB', lastUsed: '4 months ago', icon: Package, color: 'orange' },
    { id: '7', name: 'Old Maps', size: '340 MB', lastUsed: '1 year ago', icon: Package, color: 'purple' },
    { id: '8', name: 'Beta Tester', size: '180 MB', lastUsed: '5 months ago', icon: Package, color: 'cyan' },
  ]);
  const [uninstalling, setUninstalling] = useState<string | null>(null);
  const user = auth.currentUser;

  React.useEffect(() => {
    const fetchApps = async () => {
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.uninstallerApps) {
            setApps(data.uninstallerApps);
          }
        }
      } catch (err) {
        console.error('Error fetching apps:', err);
      }
    };
    fetchApps();
  }, [user]);

  const handleUninstall = async (id: string) => {
    setUninstalling(id);
    setTimeout(async () => {
      const newApps = apps.filter(app => app.id !== id);
      setApps(newApps);
      setUninstalling(null);
      
      if (user) {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            uninstallerApps: newApps,
            lastUninstall: serverTimestamp()
          }, { merge: true });
        } catch (err) {
          console.error('Error saving app list:', err);
        }
      }
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6 pb-24 h-full"
    >
      <div className="flex items-center gap-4 px-2">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white/50 hover:text-neon-cyan transition-all">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Smart Uninstaller</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <NeonCard glowColor="red" className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-neon-red/5 to-transparent">
          <div className="text-5xl font-display font-bold text-neon-red tracking-tighter">{apps.length}<span className="text-xl ml-1">Apps</span></div>
          <StatusBadge label="Unused Apps Detected" color="red" />
          <p className="text-xs text-white/40 text-center px-8">Removing unused applications can free up significant storage space.</p>
        </NeonCard>

        <div className="flex flex-col gap-3">
          <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Installed Applications</div>
          <AnimatePresence>
            {apps.map((app) => (
              <motion.div 
                key={app.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-neon-${app.color}/10 flex items-center justify-center border border-neon-${app.color}/20`}>
                    <app.icon className={`text-neon-${app.color}`} size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{app.name}</div>
                    <div className="text-[9px] text-white/40 uppercase tracking-widest">Last used: {app.lastUsed}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-display font-bold text-white/60">{app.size}</div>
                  <button 
                    onClick={() => handleUninstall(app.id)}
                    disabled={uninstalling === app.id}
                    className="p-3 bg-neon-red/10 border border-neon-red/20 rounded-xl text-neon-red hover:bg-neon-red hover:text-white transition-all disabled:opacity-50"
                  >
                    {uninstalling === app.id ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <Trash2 size={18} />
                      </motion.div>
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
