import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, StatusBadge } from '../components/UI';
import { Shield, ArrowLeft, Globe, Lock, Unlock, ShieldCheck, ShieldAlert, Zap } from 'lucide-react';

export default function VPNStatus({ onBack }: { onBack: () => void }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleToggle = () => {
    if (connected) {
      setConnected(false);
    } else {
      setConnecting(true);
      setTimeout(() => {
        setConnecting(false);
        setConnected(true);
      }, 3000);
    }
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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Ultra VPN Shield</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <NeonCard glowColor={connected ? 'green' : 'red'} className="flex flex-col items-center gap-8 py-12 bg-gradient-to-b from-white/5 to-transparent">
          <div className="relative">
            <motion.div 
              animate={connected ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`absolute inset-0 ${connected ? 'bg-neon-green/20' : 'bg-neon-red/20'} rounded-full blur-3xl`}
            />
            <div className={`w-32 h-32 rounded-full flex items-center justify-center border-2 border-dashed ${connected ? 'border-neon-green/30' : 'border-neon-red/30'} relative z-10`}>
              {connecting ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                  <Zap size={64} className="text-neon-cyan" />
                </motion.div>
              ) : connected ? (
                <ShieldCheck size={64} className="text-neon-green" />
              ) : (
                <ShieldAlert size={64} className="text-neon-red" />
              )}
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <h2 className={`text-3xl font-display font-bold uppercase tracking-tighter ${connected ? 'text-neon-green' : 'text-neon-red'}`}>
              {connecting ? 'Connecting...' : connected ? 'Shield Active' : 'Shield Offline'}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <Globe size={14} className="text-white/40" />
              <span className="text-xs font-mono text-white/40">
                {connected ? '104.21.45.122 (Frankfurt, DE)' : 'Your IP: 182.16.4.22 (Colombo, LK)'}
              </span>
            </div>
          </div>
        </NeonCard>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-2">
            <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Encryption</div>
            <div className="text-lg font-display font-bold text-white">AES-256</div>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-2">
            <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Protocol</div>
            <div className="text-lg font-display font-bold text-white">UltraWire</div>
          </div>
        </div>

        <div className="p-6 bg-neon-cyan/5 border border-neon-cyan/10 rounded-[2rem] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20">
              <Lock className="text-neon-cyan" size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Kill Switch</div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest">Auto-disconnect on leak</div>
            </div>
          </div>
          <StatusBadge label="Enabled" color="cyan" />
        </div>

        <div className="pt-4">
          <NeonButton 
            variant={connected ? 'red' : 'green'} 
            onClick={handleToggle} 
            disabled={connecting}
            className="w-full flex items-center justify-center gap-3"
          >
            {connected ? <Unlock size={20} /> : <Lock size={20} />}
            {connected ? 'DISCONNECT SHIELD' : 'ACTIVATE SHIELD'}
          </NeonButton>
        </div>
      </div>
    </motion.div>
  );
}
