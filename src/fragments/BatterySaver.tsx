import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NeonCard, NeonButton, CircularGauge } from '../components/UI';
import { Battery, Zap, ArrowLeft, ShieldCheck, Clock, Sun, Moon } from 'lucide-react';

export default function BatterySaver({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<'normal' | 'balanced' | 'ultra'>('normal');
  const batteryLevel = 78;
  const timeRemaining = {
    normal: '12h 45m',
    balanced: '18h 20m',
    ultra: '42h 10m',
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 pb-24 h-full">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-neon-cyan" />
        </button>
        <h1 className="text-2xl font-display font-bold text-neon-cyan">BATTERY SAVER</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        <div className="flex justify-center py-4">
          <CircularGauge value={batteryLevel} size={160} strokeWidth={10} label="Battery Level" color="#00FF88" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="text-3xl font-display font-bold text-neon-green">{timeRemaining[mode]}</div>
          <div className="text-xs text-white/50 uppercase tracking-widest">Remaining Time</div>
        </div>

        <div className="flex flex-col gap-4">
          <NeonCard
            glowColor={mode === 'normal' ? 'green' : 'cyan'}
            className={`flex items-center gap-4 cursor-pointer transition-all ${mode === 'normal' ? 'bg-neon-green/10 border-neon-green/50' : 'bg-white/5'}`}
            onClick={() => setMode('normal')}
          >
            <div className={`p-3 rounded-xl ${mode === 'normal' ? 'bg-neon-green/20 text-neon-green' : 'bg-white/5 text-white/30'}`}>
              <Sun size={24} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">Normal Mode</div>
              <div className="text-xs text-white/50">Standard performance</div>
            </div>
            {mode === 'normal' && <ShieldCheck size={20} className="text-neon-green" />}
          </NeonCard>

          <NeonCard
            glowColor={mode === 'balanced' ? 'green' : 'cyan'}
            className={`flex items-center gap-4 cursor-pointer transition-all ${mode === 'balanced' ? 'bg-neon-green/10 border-neon-green/50' : 'bg-white/5'}`}
            onClick={() => setMode('balanced')}
          >
            <div className={`p-3 rounded-xl ${mode === 'balanced' ? 'bg-neon-green/20 text-neon-green' : 'bg-white/5 text-white/30'}`}>
              <Zap size={24} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">Balanced Mode</div>
              <div className="text-xs text-white/50">Optimize background apps</div>
            </div>
            {mode === 'balanced' && <ShieldCheck size={20} className="text-neon-green" />}
          </NeonCard>

          <NeonCard
            glowColor={mode === 'ultra' ? 'green' : 'cyan'}
            className={`flex items-center gap-4 cursor-pointer transition-all ${mode === 'ultra' ? 'bg-neon-green/10 border-neon-green/50' : 'bg-white/5'}`}
            onClick={() => setMode('ultra')}
          >
            <div className={`p-3 rounded-xl ${mode === 'ultra' ? 'bg-neon-green/20 text-neon-green' : 'bg-white/5 text-white/30'}`}>
              <Moon size={24} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">Ultra Power Saving</div>
              <div className="text-xs text-white/50">Only essential apps allowed</div>
            </div>
            {mode === 'ultra' && <ShieldCheck size={20} className="text-neon-green" />}
          </NeonCard>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-xs text-white/50 uppercase tracking-widest px-2">Battery Health</div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-neon-green" />
              <div className="text-sm">Health Status</div>
            </div>
            <div className="text-sm font-bold text-neon-green uppercase">Excellent</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <Zap size={16} className="text-neon-green" />
              <div className="text-sm">Temperature</div>
            </div>
            <div className="text-sm font-bold text-neon-green">32°C</div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <NeonButton variant="green" onClick={onBack} className="w-full">OPTIMIZE BATTERY</NeonButton>
      </div>
    </motion.div>
  );
}
