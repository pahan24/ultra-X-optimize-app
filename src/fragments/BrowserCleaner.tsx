import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, ProgressBar, StatusBadge } from '../components/UI';
import { Globe, ArrowLeft, Trash2, CheckCircle2, Shield, History, Cookie, Database } from 'lucide-react';

export default function BrowserCleaner({ onBack }: { onBack: () => void }) {
  const [scanning, setScanning] = useState(true);
  const [cleaning, setCleaning] = useState(false);
  const [cleaned, setCleaned] = useState(false);
  const [progress, setProgress] = useState(0);

  const browserData = [
    { id: 'history', name: 'Browsing History', size: '124 MB', icon: History, color: 'cyan', selected: true },
    { id: 'cookies', name: 'Cookies & Site Data', size: '45 MB', icon: Cookie, color: 'purple', selected: true },
    { id: 'cache', name: 'Cached Images & Files', size: '890 MB', icon: Database, color: 'green', selected: true },
    { id: 'passwords', name: 'Saved Passwords', size: '0.2 MB', icon: Shield, color: 'red', selected: false },
  ];

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanning(false);
            return 100;
          }
          return prev + 15;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  const handleClean = () => {
    setCleaning(true);
    setTimeout(() => {
      setCleaning(false);
      setCleaned(true);
    }, 3000);
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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Browser Cleaner</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          {scanning ? (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 gap-8"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-48 h-48 border-2 border-dashed border-neon-cyan/20 rounded-full flex items-center justify-center"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe size={64} className="text-neon-cyan animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-4 w-full px-8">
                <div className="text-2xl font-display font-bold text-white uppercase tracking-[0.2em]">Analyzing Browsers...</div>
                <ProgressBar value={progress} color="#00F5FF" />
              </div>
            </motion.div>
          ) : cleaning ? (
            <motion.div 
              key="cleaning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 gap-8"
            >
              <div className="relative w-48 h-48 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-neon-green/20 rounded-full blur-2xl"
                />
                <Trash2 size={64} className="text-neon-green animate-bounce" />
              </div>
              <div className="text-center space-y-4 w-full px-8">
                <div className="text-2xl font-display font-bold text-neon-green uppercase tracking-[0.2em]">Clearing Data...</div>
                <ProgressBar value={100} color="#00FF88" />
              </div>
            </motion.div>
          ) : cleaned ? (
            <motion.div 
              key="cleaned"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 gap-6"
            >
              <div className="w-32 h-32 bg-neon-green/10 rounded-full flex items-center justify-center border border-neon-green/30 shadow-[0_0_50px_rgba(0,255,136,0.2)]">
                <CheckCircle2 size={64} className="text-neon-green" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-neon-green uppercase tracking-tighter">1.06 GB Cleared</h2>
                <p className="text-sm text-white/40 mt-2">Browser privacy restored</p>
              </div>
              <NeonButton variant="outline" onClick={onBack} className="w-full mt-4">
                BACK TO DASHBOARD
              </NeonButton>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <NeonCard glowColor="cyan" className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-neon-cyan/5 to-transparent">
                <div className="text-5xl font-display font-bold text-neon-cyan tracking-tighter">1.06<span className="text-xl ml-1">GB</span></div>
                <StatusBadge label="Privacy Risk Found" color="cyan" />
                <p className="text-xs text-white/40 text-center px-8">Cleaning browser data improves privacy and frees up space.</p>
              </NeonCard>

              <div className="flex flex-col gap-3">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Browser Data Breakdown</div>
                {browserData.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-neon-${item.color}/10 flex items-center justify-center border border-neon-${item.color}/20`}>
                        <item.icon className={`text-neon-${item.color}`} size={24} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{item.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">Safe to Clear</div>
                      </div>
                    </div>
                    <div className="text-sm font-display font-bold text-white">{item.size}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <NeonButton variant="cyan" onClick={handleClean} className="w-full flex items-center justify-center gap-3">
                  <Trash2 size={20} /> CLEAR BROWSER DATA
                </NeonButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
