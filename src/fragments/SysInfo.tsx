import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NeonCard, StatusBadge } from '../components/UI';
import { ArrowLeft, Info, Cpu, Smartphone, Database, Wifi, Monitor, HardDrive, MemoryStick } from 'lucide-react';

export default function SysInfo({ onBack }: { onBack: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const specs = [
    { icon: Smartphone, label: 'Device', value: 'UltraX Pro Max v4' },
    { icon: Cpu, label: 'Processor', value: 'Octa-core 3.2GHz' },
    { icon: MemoryStick, label: 'RAM', value: '12 GB LPDDR5' },
    { icon: HardDrive, label: 'Storage', value: '256 GB UFS 3.1' },
    { icon: Monitor, label: 'Display', value: '6.7" AMOLED 120Hz' },
    { icon: Database, label: 'OS', value: 'UltraCore OS v14.2' },
    { icon: Wifi, label: 'Network', value: '5G / Wi-Fi 6E' },
  ];

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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">System Information</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-12 h-12 border-2 border-neon-cyan/20 border-t-neon-cyan rounded-full"
            />
            <div className="text-[10px] text-neon-cyan font-bold uppercase tracking-[0.4em] animate-pulse">Reading Hardware...</div>
          </div>
        ) : (
          <>
            <NeonCard glowColor="cyan" className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20">
                  <Info className="text-neon-cyan" size={24} />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Hardware Audit</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">Verified System Specs</div>
                </div>
              </div>
            </NeonCard>

            <div className="grid grid-cols-1 gap-3">
              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <spec.icon className="text-white/60" size={20} />
                    </div>
                    <div className="text-sm font-medium text-white/60">{spec.label}</div>
                  </div>
                  <div className="text-sm font-bold text-white">{spec.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-neon-cyan/5 border border-neon-cyan/10 rounded-[2rem] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neon-cyan font-bold uppercase tracking-widest">Kernel Version</span>
                <span className="text-xs font-mono text-white/60">5.10.168-ultra-x</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neon-cyan font-bold uppercase tracking-widest">Build Number</span>
                <span className="text-xs font-mono text-white/60">UX-2024-03-24-REL</span>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
