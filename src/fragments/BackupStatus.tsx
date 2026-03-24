import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, ProgressBar, StatusBadge } from '../components/UI';
import { Cloud, ArrowLeft, RefreshCw, CheckCircle2, FileText, Image as ImageIcon, Video, Music, CloudUpload } from 'lucide-react';

export default function BackupStatus({ onBack }: { onBack: () => void }) {
  const [backingUp, setBackingUp] = useState(false);
  const [backedUp, setBackedUp] = useState(false);
  const [progress, setProgress] = useState(0);

  const backupItems = [
    { id: 'photos', name: 'Photos & Videos', size: '12.4 GB', icon: ImageIcon, color: 'cyan', status: 'Synced' },
    { id: 'docs', name: 'Documents', size: '450 MB', icon: FileText, color: 'purple', status: 'Synced' },
    { id: 'music', name: 'Music Library', size: '2.8 GB', icon: Music, color: 'green', status: 'Out of Sync' },
    { id: 'system', name: 'System Settings', size: '12 MB', icon: Cloud, color: 'orange', status: 'Synced' },
  ];

  const handleBackup = () => {
    setBackingUp(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 4;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setBackingUp(false);
        setBackedUp(true);
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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Cloud Backup</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          {backingUp ? (
            <motion.div 
              key="backingup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 gap-8"
            >
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-2xl"
                />
                <CloudUpload size={64} className="text-neon-cyan animate-bounce" />
              </div>
              <div className="text-center space-y-4 w-full px-8">
                <div className="text-2xl font-display font-bold text-neon-cyan uppercase tracking-[0.2em]">Syncing to Cloud...</div>
                <ProgressBar value={progress} color="#00F5FF" />
              </div>
            </motion.div>
          ) : backedUp ? (
            <motion.div 
              key="backedup"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 gap-6"
            >
              <div className="w-32 h-32 bg-neon-green/10 rounded-full flex items-center justify-center border border-neon-green/30 shadow-[0_0_50px_rgba(0,255,136,0.2)]">
                <CheckCircle2 size={64} className="text-neon-green" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-neon-green uppercase tracking-tighter">Backup Complete</h2>
                <p className="text-sm text-white/40 mt-2">All files are securely stored in the cloud</p>
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
                <div className="text-5xl font-display font-bold text-neon-cyan tracking-tighter">15.6<span className="text-xl ml-1">GB</span></div>
                <StatusBadge label="Total Cloud Storage" color="cyan" />
                <p className="text-xs text-white/40 text-center px-8">Last backup: 4 hours ago. 2.8 GB pending sync.</p>
              </NeonCard>

              <div className="flex flex-col gap-3">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Sync Status</div>
                {backupItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-neon-${item.color}/10 flex items-center justify-center border border-neon-${item.color}/20`}>
                        <item.icon className={`text-neon-${item.color}`} size={24} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{item.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">{item.size}</div>
                      </div>
                    </div>
                    <StatusBadge label={item.status} color={item.status === 'Synced' ? 'green' : 'orange'} />
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <NeonButton variant="cyan" onClick={handleBackup} className="w-full flex items-center justify-center gap-3">
                  <RefreshCw size={20} /> SYNC NOW
                </NeonButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
