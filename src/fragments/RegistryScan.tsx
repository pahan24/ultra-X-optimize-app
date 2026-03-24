import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, ProgressBar, StatusBadge } from '../components/UI';
import { Search, ArrowLeft, Trash2, CheckCircle2, ShieldAlert, FileCode, Settings, Database } from 'lucide-react';

export default function RegistryScan({ onBack }: { onBack: () => void }) {
  const [scanning, setScanning] = useState(true);
  const [cleaning, setCleaning] = useState(false);
  const [cleaned, setCleaned] = useState(false);
  const [progress, setProgress] = useState(0);

  const registryIssues = [
    { id: 'paths', name: 'Invalid File Paths', count: 142, icon: FileCode, color: 'red' },
    { id: 'ext', name: 'Unused Extensions', count: 89, icon: Database, color: 'purple' },
    { id: 'keys', name: 'Broken Registry Keys', count: 215, icon: Settings, color: 'orange' },
    { id: 'dll', name: 'Missing Shared DLLs', count: 12, icon: ShieldAlert, color: 'red' },
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
          return prev + 12;
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
    }, 3500);
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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Registry Optimizer</h1>
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
                  className="w-48 h-48 border-2 border-dashed border-neon-red/20 rounded-full flex items-center justify-center"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Search size={64} className="text-neon-red animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-4 w-full px-8">
                <div className="text-2xl font-display font-bold text-white uppercase tracking-[0.2em]">Scanning Registry...</div>
                <ProgressBar value={progress} color="#FF2D55" />
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
                <div className="text-2xl font-display font-bold text-neon-green uppercase tracking-[0.2em]">Repairing Keys...</div>
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
                <h2 className="text-3xl font-display font-bold text-neon-green uppercase tracking-tighter">Registry Optimized</h2>
                <p className="text-sm text-white/40 mt-2">458 issues resolved successfully</p>
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
              <NeonCard glowColor="red" className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-neon-red/5 to-transparent">
                <div className="text-5xl font-display font-bold text-neon-red tracking-tighter">458<span className="text-xl ml-1">Issues</span></div>
                <StatusBadge label="Critical Errors" color="red" />
                <p className="text-xs text-white/40 text-center px-8">Broken registry entries can lead to system crashes and slow performance.</p>
              </NeonCard>

              <div className="flex flex-col gap-3">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Issue Breakdown</div>
                {registryIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-neon-${issue.color}/10 flex items-center justify-center border border-neon-${issue.color}/20`}>
                        <issue.icon className={`text-neon-${issue.color}`} size={24} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{issue.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">Action Recommended</div>
                      </div>
                    </div>
                    <div className="text-sm font-display font-bold text-neon-red">{issue.count}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <NeonButton variant="red" onClick={handleClean} className="w-full flex items-center justify-center gap-3">
                  <Trash2 size={20} /> REPAIR REGISTRY
                </NeonButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
