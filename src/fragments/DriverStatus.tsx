import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, ProgressBar, StatusBadge } from '../components/UI';
import { ArrowLeft, RefreshCw, CheckCircle2, AlertCircle, Cpu, Wifi, Monitor, Speaker } from 'lucide-react';

export default function DriverStatus({ onBack }: { onBack: () => void }) {
  const [scanning, setScanning] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [progress, setProgress] = useState(0);

  const drivers = [
    { id: 'gpu', name: 'Graphics Driver', version: 'v546.33', status: 'Update Available', icon: Monitor, color: 'orange' },
    { id: 'wifi', name: 'Network Adapter', version: 'v22.250.0', status: 'Up to Date', icon: Wifi, color: 'green' },
    { id: 'audio', name: 'Audio Controller', version: 'v6.0.9601', status: 'Update Available', icon: Speaker, color: 'orange' },
    { id: 'chipset', name: 'System Chipset', version: 'v10.1.19444', status: 'Up to Date', icon: Cpu, color: 'green' },
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
          return prev + 20;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  const handleUpdate = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      setUpdated(true);
    }, 4000);
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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Driver Status</h1>
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
                  className="w-48 h-48 border-2 border-dashed border-neon-orange/20 rounded-full flex items-center justify-center"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw size={64} className="text-neon-orange animate-spin" />
                </div>
              </div>
              <div className="text-center space-y-4 w-full px-8">
                <div className="text-2xl font-display font-bold text-white uppercase tracking-[0.2em]">Checking Drivers...</div>
                <ProgressBar value={progress} color="#FF6B00" />
              </div>
            </motion.div>
          ) : updating ? (
            <motion.div 
              key="updating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 gap-8"
            >
              <div className="relative w-48 h-48 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-2xl"
                />
                <RefreshCw size={64} className="text-neon-cyan animate-spin" />
              </div>
              <div className="text-center space-y-4 w-full px-8">
                <div className="text-2xl font-display font-bold text-neon-cyan uppercase tracking-[0.2em]">Updating Drivers...</div>
                <ProgressBar value={100} color="#00F5FF" />
              </div>
            </motion.div>
          ) : updated ? (
            <motion.div 
              key="updated"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 gap-6"
            >
              <div className="w-32 h-32 bg-neon-green/10 rounded-full flex items-center justify-center border border-neon-green/30 shadow-[0_0_50px_rgba(0,255,136,0.2)]">
                <CheckCircle2 size={64} className="text-neon-green" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-neon-green uppercase tracking-tighter">System Updated</h2>
                <p className="text-sm text-white/40 mt-2">All drivers are now at latest versions</p>
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
              <NeonCard glowColor="orange" className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-neon-orange/5 to-transparent">
                <div className="text-5xl font-display font-bold text-neon-orange tracking-tighter">2<span className="text-xl ml-1">Updates</span></div>
                <StatusBadge label="Action Required" color="orange" />
                <p className="text-xs text-white/40 text-center px-8">Outdated drivers can cause system instability and performance drops.</p>
              </NeonCard>

              <div className="flex flex-col gap-3">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Driver Inventory</div>
                {drivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-neon-${driver.color}/10 flex items-center justify-center border border-neon-${driver.color}/20`}>
                        <driver.icon className={`text-neon-${driver.color}`} size={24} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{driver.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">{driver.version}</div>
                      </div>
                    </div>
                    <StatusBadge label={driver.status} color={driver.color as any} />
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <NeonButton variant="orange" onClick={handleUpdate} className="w-full flex items-center justify-center gap-3">
                  <RefreshCw size={20} /> UPDATE ALL DRIVERS
                </NeonButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
