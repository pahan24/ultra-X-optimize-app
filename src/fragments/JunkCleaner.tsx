import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, ProgressBar, StatusBadge } from '../components/UI';
import { Trash2, ArrowLeft, ShieldCheck, FileText, Package, AlertCircle, CheckCircle2, Database, Image as ImageIcon } from 'lucide-react';

export default function JunkCleaner({ onBack }: { onBack: () => void }) {
  const [scanning, setScanning] = useState(true);
  const [cleaning, setCleaning] = useState(false);
  const [cleaned, setCleaned] = useState(false);
  const [currentFile, setCurrentFile] = useState('Initializing scan...');
  const [progress, setProgress] = useState(0);

  const junkTypes = [
    { id: 'cache', name: 'System Cache', size: '1.2 GB', icon: Database, color: 'cyan', selected: true },
    { id: 'logs', name: 'Log Files', size: '450 MB', icon: FileText, color: 'purple', selected: true },
    { id: 'temp', name: 'Temp Files', size: '890 MB', icon: Trash2, color: 'orange', selected: true },
    { id: 'media', name: 'Media Cache', size: '2.4 GB', icon: ImageIcon, color: 'red', selected: true },
  ];

  useEffect(() => {
    if (scanning) {
      const files = [
        'com.android.system.cache...',
        'temp_data_0823.tmp',
        'residual_app_data_fb...',
        'old_log_files_2024...',
        'thumbnail_cache_v2...',
        'analyzing_storage_blocks...',
        'finalizing_junk_report...'
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < files.length) {
          setCurrentFile(files[i]);
          setProgress((prev) => Math.min(prev + 15, 100));
          i++;
        } else {
          clearInterval(interval);
          setScanning(false);
        }
      }, 600);
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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Deep Junk Cleaner</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
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
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="w-48 h-48 border-2 border-dashed border-neon-cyan/20 rounded-full flex items-center justify-center"
                >
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    className="w-40 h-40 border border-dashed border-neon-purple/20 rounded-full"
                  />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Trash2 size={64} className="text-neon-cyan animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-4 w-full px-8">
                <div className="text-2xl font-display font-bold text-white uppercase tracking-[0.2em]">Scanning...</div>
                <div className="text-[10px] text-white/40 font-mono h-4">{currentFile}</div>
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
                <div className="text-2xl font-display font-bold text-neon-green uppercase tracking-[0.2em]">Cleaning Junk...</div>
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
                <h2 className="text-3xl font-display font-bold text-neon-green uppercase tracking-tighter">4.94 GB Cleaned</h2>
                <p className="text-sm text-white/40 mt-2">Your device is now optimized</p>
              </div>
              <NeonCard glowColor="green" className="w-full mt-4 flex items-center gap-4">
                <ShieldCheck className="text-neon-green" size={24} />
                <div className="text-xs text-white/60">System performance improved by 24%</div>
              </NeonCard>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <NeonCard glowColor="cyan" className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-neon-cyan/5 to-transparent">
                <div className="text-5xl font-display font-bold text-neon-cyan tracking-tighter">4.94<span className="text-xl ml-1">GB</span></div>
                <StatusBadge label="Junk Detected" color="cyan" />
                <p className="text-xs text-white/40 text-center px-8">Safe to clean. No personal files will be affected.</p>
              </NeonCard>

              <div className="flex flex-col gap-3">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Detailed Breakdown</div>
                {junkTypes.map((type) => (
                  <div key={type.id} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-neon-${type.color}/10 flex items-center justify-center border border-neon-${type.color}/20`}>
                        <type.icon className={`text-neon-${type.color}`} size={24} />
                      </div>
                      <div>
                        <div className="text-sm font-bold">{type.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">Safe to Remove</div>
                      </div>
                    </div>
                    <div className="text-sm font-display font-bold text-white">{type.size}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!scanning && !cleaning && !cleaned && (
        <div className="pt-4">
          <NeonButton variant="cyan" onClick={handleClean} className="w-full flex items-center justify-center gap-3">
            <Trash2 size={20} /> CLEAN NOW
          </NeonButton>
        </div>
      )}

      {cleaned && (
        <div className="pt-4">
          <NeonButton variant="outline" onClick={onBack} className="w-full">
            BACK TO DASHBOARD
          </NeonButton>
        </div>
      )}
    </motion.div>
  );
}
