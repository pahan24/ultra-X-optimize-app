import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton } from '../components/UI';
import { Wifi, ArrowLeft, Activity, Globe, Zap, ShieldCheck, RefreshCw, Signal } from 'lucide-react';

export default function NetworkOptimizer({ onBack }: { onBack: () => void }) {
  const [testing, setTesting] = useState(false);
  const [optimized, setOptimized] = useState(false);
  const [speed, setSpeed] = useState(45.2);
  const [ping, setPing] = useState(38);

  const handleOptimize = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      setOptimized(true);
      setSpeed(68.5);
      setPing(18);
    }, 4000);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 pb-24 h-full">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-neon-cyan" />
        </button>
        <h1 className="text-2xl font-display font-bold text-neon-cyan uppercase">Network Optimizer</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        {/* Speed Display */}
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-neon-cyan/10 blur-3xl rounded-full scale-150" />
            <div className="w-40 h-40 rounded-full border-4 border-white/5 flex flex-col items-center justify-center relative z-10">
              <div className="text-4xl font-display font-bold text-neon-cyan">{speed.toFixed(1)}</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest">Mbps</div>
              <motion.div 
                animate={testing ? { rotate: 360 } : {}} 
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="absolute inset-0 border-4 border-transparent border-t-neon-cyan rounded-full"
                style={{ opacity: testing ? 1 : 0 }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 w-full px-8">
            <div className="text-center">
              <div className="text-lg font-display font-bold text-neon-purple">{ping}ms</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest">Ping</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-display font-bold text-neon-green">98%</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest">Stability</div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {optimized ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <NeonCard glowColor="green" className="flex items-center gap-4 py-4">
                <div className="w-12 h-12 bg-neon-green/20 rounded-xl flex items-center justify-center">
                  <ShieldCheck size={24} className="text-neon-green" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase">Network Optimized</div>
                  <div className="text-xs text-white/50">DNS cache cleared and signal boosted</div>
                </div>
              </NeonCard>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-4">
          <NeonCard glowColor="cyan" className="flex flex-col gap-2 bg-white/5">
            <Globe size={20} className="text-neon-cyan" />
            <div className="text-xs font-bold uppercase tracking-widest">DNS Server</div>
            <div className="text-[10px] text-white/50">Google DNS (8.8.8.8)</div>
          </NeonCard>
          <NeonCard glowColor="purple" className="flex flex-col gap-2 bg-white/5">
            <Signal size={20} className="text-neon-purple" />
            <div className="text-xs font-bold uppercase tracking-widest">Connection</div>
            <div className="text-[10px] text-white/50">5G / Wi-Fi 6</div>
          </NeonCard>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-xs text-white/50 uppercase tracking-widest px-2">Optimization Tasks</div>
          {[
            { label: 'Clear DNS Cache', icon: RefreshCw, color: 'text-neon-cyan' },
            { label: 'Optimize Signal Strength', icon: Signal, color: 'text-neon-green' },
            { label: 'Background Data Control', icon: Activity, color: 'text-neon-purple' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <item.icon size={18} className="text-white/40" />
                <div className="text-sm font-bold">{item.label}</div>
              </div>
              <div className={`w-2 h-2 rounded-full bg-neon-green shadow-[0_0_5px_rgba(0,255,136,0.5)]`} />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <AnimatePresence mode="wait">
          {testing ? (
            <motion.div key="testing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 4 }} className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,245,255,0.5)]" />
              </div>
              <div className="text-xl font-display font-bold text-neon-cyan animate-pulse uppercase tracking-widest">Optimizing Network...</div>
            </motion.div>
          ) : (
            <NeonButton variant="cyan" onClick={handleOptimize} className="w-full uppercase">Optimize Connection</NeonButton>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
