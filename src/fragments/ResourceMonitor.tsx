import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, StatusBadge, ProgressBar } from '../components/UI';
import { Activity, ArrowLeft, Cpu, Database, Wifi, Zap, Thermometer, TrendingUp } from 'lucide-react';

export default function ResourceMonitor({ onBack }: { onBack: () => void }) {
  const [cpuUsage, setCpuUsage] = useState(42);
  const [ramUsage, setRamUsage] = useState(68);
  const [networkUsage, setNetworkUsage] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30);
      setRamUsage(Math.floor(Math.random() * 10) + 60);
      setNetworkUsage(Math.floor(Math.random() * 50) + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Real-time Resource Monitor</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <NeonCard glowColor="cyan" className="flex flex-col gap-8 bg-gradient-to-br from-neon-cyan/5 to-transparent p-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="text-xl font-display font-bold text-white">CPU Activity</h4>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Load Distribution</div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan">
              <TrendingUp size={16} />
              <span className="text-xs font-bold">{cpuUsage}%</span>
            </div>
          </div>
          
          <div className="flex items-end gap-3 h-32 px-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col gap-3 items-center group">
                <div className="relative w-full h-full flex items-end">
                  <motion.div 
                    animate={{ height: `${Math.floor(Math.random() * 60) + 40}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={cn(
                      "w-full rounded-t-xl transition-all duration-500",
                      i > 8 ? "bg-neon-cyan shadow-[0_0_25px_rgba(0,245,255,0.6)]" : "bg-white/10 group-hover:bg-white/30"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </NeonCard>

        <div className="space-y-4">
          <div className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold px-2">System Vitals</div>
          
          <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Cpu size={18} className="text-neon-cyan" />
                <span className="text-sm font-bold text-white">CPU Usage</span>
              </div>
              <span className="text-sm font-mono text-neon-cyan">{cpuUsage}%</span>
            </div>
            <ProgressBar value={cpuUsage} color="#00F5FF" />
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Database size={18} className="text-neon-purple" />
                <span className="text-sm font-bold text-white">RAM Usage</span>
              </div>
              <span className="text-sm font-mono text-neon-purple">{ramUsage}%</span>
            </div>
            <ProgressBar value={ramUsage} color="#BF00FF" />
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Wifi size={18} className="text-neon-green" />
                <span className="text-sm font-bold text-white">Network Load</span>
              </div>
              <span className="text-sm font-mono text-neon-green">{networkUsage} Mbps</span>
            </div>
            <ProgressBar value={networkUsage} color="#00FF88" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col items-center gap-2">
            <Thermometer size={24} className="text-neon-orange" />
            <div className="text-lg font-display font-bold text-white">42°C</div>
            <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Temp</div>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col items-center gap-2">
            <Zap size={24} className="text-neon-cyan" />
            <div className="text-lg font-display font-bold text-white">1.2V</div>
            <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Voltage</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
