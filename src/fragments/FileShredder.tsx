import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, ProgressBar, StatusBadge } from '../components/UI';
import { ShieldAlert, ArrowLeft, Trash2, CheckCircle2, FileText, Lock, AlertTriangle } from 'lucide-react';

export default function FileShredder({ onBack }: { onBack: () => void }) {
  const [shredding, setShredding] = useState(false);
  const [shredded, setShredded] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleShred = () => {
    setShredding(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setShredding(false);
        setShredded(true);
      }
    }, 150);
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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Secure File Shredder</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          {shredding ? (
            <motion.div 
              key="shredding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 gap-8"
            >
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="absolute inset-0 bg-neon-red/20 rounded-full blur-2xl"
                />
                <ShieldAlert size={64} className="text-neon-red animate-pulse" />
              </div>
              <div className="text-center space-y-4 w-full px-8">
                <div className="text-2xl font-display font-bold text-neon-red uppercase tracking-[0.2em]">Shredding Data...</div>
                <div className="text-[10px] text-white/40 font-mono">Overwriting blocks with random data...</div>
                <ProgressBar value={progress} color="#FF2D55" />
              </div>
            </motion.div>
          ) : shredded ? (
            <motion.div 
              key="shredded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 gap-6"
            >
              <div className="w-32 h-32 bg-neon-green/10 rounded-full flex items-center justify-center border border-neon-green/30 shadow-[0_0_50px_rgba(0,255,136,0.2)]">
                <CheckCircle2 size={64} className="text-neon-green" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-neon-green uppercase tracking-tighter">Data Destroyed</h2>
                <p className="text-sm text-white/40 mt-2">Files are now unrecoverable</p>
              </div>
              <NeonButton variant="outline" onClick={onBack} className="w-full mt-4">
                BACK TO DASHBOARD
              </NeonButton>
            </motion.div>
          ) : (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <NeonCard glowColor="red" className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-neon-red/5 to-transparent">
                <div className="w-16 h-16 bg-neon-red/10 rounded-full flex items-center justify-center border border-neon-red/30">
                  <Lock size={32} className="text-neon-red" />
                </div>
                <StatusBadge label="Secure Deletion" color="red" />
                <p className="text-xs text-white/40 text-center px-8">Files shredded with UltraX are overwritten multiple times and cannot be recovered by any software.</p>
              </NeonCard>

              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-4">
                <div className="flex items-center gap-4 text-neon-orange">
                  <AlertTriangle size={24} />
                  <div className="text-sm font-bold uppercase tracking-widest">Warning</div>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  This process is irreversible. Once shredded, the data is permanently removed from the storage medium.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Selected Files</div>
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <FileText className="text-white/60" size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Confidential_Report.docx</div>
                      <div className="text-[9px] text-white/40 uppercase tracking-widest">1.2 MB</div>
                    </div>
                  </div>
                  <Trash2 size={18} className="text-white/20" />
                </div>
              </div>

              <div className="pt-4">
                <NeonButton variant="red" onClick={handleShred} className="w-full flex items-center justify-center gap-3">
                  <ShieldAlert size={20} /> SHRED PERMANENTLY
                </NeonButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
