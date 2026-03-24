import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, ProgressBar, StatusBadge, CircularGauge } from '../components/UI';
import { HardDrive, ArrowLeft, CheckCircle2, AlertCircle, Thermometer, Activity, Database } from 'lucide-react';

export default function DiskHealth({ onBack }: { onBack: () => void }) {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanning(false);
            return 100;
          }
          return prev + 8;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [scanning]);

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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Disk Health Monitor</h1>
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
                  <HardDrive size={64} className="text-neon-cyan animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-4 w-full px-8">
                <div className="text-2xl font-display font-bold text-white uppercase tracking-[0.2em]">Analyzing Disk...</div>
                <ProgressBar value={progress} color="#00F5FF" />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <NeonCard glowColor="green" className="flex flex-col items-center gap-8 py-10 bg-gradient-to-b from-neon-green/5 to-transparent">
                <CircularGauge value={98} size={180} color="#00FF88" label="Disk Health" />
                <div className="flex flex-col items-center gap-2">
                  <StatusBadge label="Excellent Condition" color="green" />
                  <p className="text-xs text-white/40 text-center px-8">Your storage drive is performing at peak efficiency.</p>
                </div>
              </NeonCard>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Thermometer, label: 'Temp', value: '34°C', color: 'green' },
                  { icon: Activity, label: 'Read Speed', value: '3.2 GB/s', color: 'cyan' },
                  { icon: Database, label: 'Bad Sectors', value: '0', color: 'green' },
                  { icon: HardDrive, label: 'Life Left', value: '99%', color: 'purple' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-[2rem] border border-white/5"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-neon-${stat.color}/10 flex items-center justify-center border border-neon-${stat.color}/20`}>
                      <stat.icon className={`text-neon-${stat.color}`} size={20} />
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-display font-bold text-white">{stat.value}</div>
                      <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4">
                <NeonButton variant="green" onClick={onBack} className="w-full">
                  BACK TO DASHBOARD
                </NeonButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
