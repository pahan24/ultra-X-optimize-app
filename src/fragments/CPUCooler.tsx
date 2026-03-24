import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, CircularGauge } from '../components/UI';
import { Zap, ArrowLeft, Snowflake, Thermometer, Wind } from 'lucide-react';

export default function CPUCooler({ onBack }: { onBack: () => void }) {
  const [cooling, setCooling] = useState(false);
  const [cooled, setCooled] = useState(false);
  const [temp, setTemp] = useState(42);

  const handleCoolDown = () => {
    setCooling(true);
    setTimeout(() => {
      setCooling(false);
      setCooled(true);
      setTemp(34);
    }, 4000);
  };

  if (cooled) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full gap-8 py-12">
        <div className="relative">
          <div className="absolute inset-0 bg-neon-orange/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="w-32 h-32 rounded-full border-4 border-neon-orange flex items-center justify-center">
            <Snowflake size={64} className="text-neon-orange" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-neon-orange">COOLED!</h2>
          <p className="text-white/50 mt-2">CPU temperature reduced to {temp}°C.</p>
        </div>
        <NeonButton variant="cyan" onClick={onBack} className="px-12">DONE</NeonButton>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 pb-24 h-full">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-neon-cyan" />
        </button>
        <h1 className="text-2xl font-display font-bold text-neon-cyan">CPU COOLER</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        <div className="flex justify-center py-4">
          <CircularGauge value={(temp / 100) * 100} size={160} strokeWidth={10} label="CPU Temp" color="#FF6B00" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="text-3xl font-display font-bold text-neon-orange">{temp}°C</div>
          <div className="text-xs text-white/50 uppercase tracking-widest">Current Temperature</div>
        </div>

        <NeonCard glowColor="orange" className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Thermometer className="text-neon-orange" size={24} />
            <div className="text-sm font-bold">Overheating Detected</div>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            Several background processes are causing the CPU to heat up. This can reduce battery life and slow down your device.
          </p>
        </NeonCard>

        <div className="flex flex-col gap-3">
          <div className="text-xs text-white/50 uppercase tracking-widest px-2">Heating Apps</div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neon-orange/20 rounded-lg flex items-center justify-center">
                  <Zap size={16} className="text-neon-orange" />
                </div>
                <div>
                  <div className="text-sm font-bold">App {i}</div>
                  <div className="text-[10px] text-white/50">High CPU usage</div>
                </div>
              </div>
              <div className="text-xs font-display text-neon-orange">{(Math.random() * 15 + 10).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <AnimatePresence mode="wait">
          {cooling ? (
            <motion.div key="cooling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="text-neon-cyan"
              >
                <Wind size={48} />
              </motion.div>
              <div className="text-xl font-display font-bold text-neon-cyan animate-pulse uppercase tracking-widest">COOLING DOWN...</div>
            </motion.div>
          ) : (
            <NeonButton variant="cyan" onClick={handleCoolDown} className="w-full">COOL DOWN</NeonButton>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
