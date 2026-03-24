import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, ProgressBar, StatusBadge } from '../components/UI';
import { Copy, ArrowLeft, Trash2, CheckCircle2, FileText, Image as ImageIcon, Video, Music } from 'lucide-react';

export default function DuplicateFinder({ onBack }: { onBack: () => void }) {
  const [scanning, setScanning] = useState(true);
  const [cleaning, setCleaning] = useState(false);
  const [cleaned, setCleaned] = useState(false);
  const [progress, setProgress] = useState(0);

  const duplicates = [
    { id: 'img1', name: 'IMG_20240320_1422.jpg', size: '4.2 MB', icon: ImageIcon, color: 'cyan', count: 2 },
    { id: 'vid1', name: 'Screen_Record_01.mp4', size: '124 MB', icon: Video, color: 'purple', count: 3 },
    { id: 'mus1', name: 'Neon_Dreams_v2.mp3', size: '8.5 MB', icon: Music, color: 'green', count: 2 },
    { id: 'doc1', name: 'System_Report_Final.pdf', size: '1.2 MB', icon: FileText, color: 'orange', count: 2 },
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
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  const handleClean = () => {
    setCleaning(true);
    setTimeout(() => {
      setCleaning(false);
      setCleaned(true);
    }, 2500);
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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Duplicate Finder</h1>
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
                  className="w-48 h-48 border-2 border-dashed border-neon-purple/20 rounded-full flex items-center justify-center"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Copy size={64} className="text-neon-purple animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-4 w-full px-8">
                <div className="text-2xl font-display font-bold text-white uppercase tracking-[0.2em]">Analyzing Files...</div>
                <ProgressBar value={progress} color="#BF00FF" />
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
                <div className="text-2xl font-display font-bold text-neon-green uppercase tracking-[0.2em]">Removing Duplicates...</div>
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
                <h2 className="text-3xl font-display font-bold text-neon-green uppercase tracking-tighter">138 MB Recovered</h2>
                <p className="text-sm text-white/40 mt-2">All duplicate files removed</p>
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
              <NeonCard glowColor="purple" className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-neon-purple/5 to-transparent">
                <div className="text-5xl font-display font-bold text-neon-purple tracking-tighter">138<span className="text-xl ml-1">MB</span></div>
                <StatusBadge label="Duplicates Found" color="purple" />
                <p className="text-xs text-white/40 text-center px-8">Safe to remove. Original files will be kept.</p>
              </NeonCard>

              <div className="flex flex-col gap-3">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Duplicate Items</div>
                {duplicates.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-neon-${item.color}/10 flex items-center justify-center border border-neon-${item.color}/20`}>
                        <item.icon className={`text-neon-${item.color}`} size={24} />
                      </div>
                      <div>
                        <div className="text-sm font-bold truncate max-w-[150px]">{item.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">{item.count} copies found</div>
                      </div>
                    </div>
                    <div className="text-sm font-display font-bold text-white">{item.size}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <NeonButton variant="purple" onClick={handleClean} className="w-full flex items-center justify-center gap-3">
                  <Trash2 size={20} /> REMOVE DUPLICATES
                </NeonButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
