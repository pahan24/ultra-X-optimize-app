import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, ProgressBar, StatusBadge } from '../components/UI';
import { Cpu, ArrowLeft, Zap, ShieldCheck, Activity, BarChart3, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RAMBooster({ onBack }: { onBack: () => void }) {
  const [boosting, setBoosting] = useState(false);
  const [boosted, setBoosted] = useState(false);
  const [ramUsage, setRamUsage] = useState(72);
  const [data, setData] = useState([
    { time: '10:00', usage: 65 },
    { time: '10:05', usage: 68 },
    { time: '10:10', usage: 72 },
    { time: '10:15', usage: 70 },
    { time: '10:20', usage: 75 },
    { time: '10:25', usage: 72 },
  ]);

  const handleBoost = () => {
    setBoosting(true);
    setTimeout(() => {
      setBoosting(false);
      setBoosted(true);
      setRamUsage(42);
      setData(prev => [...prev.slice(1), { time: '10:30', usage: 42 }]);
    }, 3500);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 pb-24 h-full">
      <div className="flex items-center gap-4 px-2">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white/50 hover:text-neon-cyan transition-all">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">RAM Accelerator</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          {boosting ? (
            <motion.div key="boosting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12 gap-8">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ rotate: { repeat: Infinity, duration: 2, ease: "linear" }, scale: { repeat: Infinity, duration: 2 } }}
                  className="w-48 h-48 border-4 border-neon-cyan/20 border-t-neon-cyan rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap size={64} className="text-neon-cyan animate-bounce" />
                </div>
              </div>
              <div className="text-center space-y-4 w-full px-8">
                <div className="text-2xl font-display font-bold text-neon-cyan uppercase tracking-[0.2em]">Accelerating...</div>
                <p className="text-xs text-white/40">Terminating background processes</p>
                <ProgressBar value={100} color="#00F5FF" />
              </div>
            </motion.div>
          ) : (
            <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
              <NeonCard glowColor={ramUsage > 70 ? 'red' : 'green'} className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-white/5 to-transparent">
                <div className="relative">
                  <div className={`text-6xl font-display font-bold tracking-tighter ${ramUsage > 70 ? 'text-neon-red' : 'text-neon-green'}`}>
                    {ramUsage}<span className="text-xl ml-1">%</span>
                  </div>
                  <div className="absolute -top-2 -right-8">
                    <StatusBadge label={ramUsage > 70 ? 'High' : 'Optimal'} color={ramUsage > 70 ? 'red' : 'green'} />
                  </div>
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Memory Occupied</div>
              </NeonCard>

              <div className="grid grid-cols-2 gap-4">
                <NeonCard glowColor="cyan" className="flex flex-col gap-2">
                  <Activity size={20} className="text-neon-cyan" />
                  <div className="text-xs font-bold uppercase tracking-widest">Available</div>
                  <div className="text-lg font-display font-bold">4.2 GB</div>
                </NeonCard>
                <NeonCard glowColor="purple" className="flex flex-col gap-2">
                  <BarChart3 size={20} className="text-neon-purple" />
                  <div className="text-xs font-bold uppercase tracking-widest">Total</div>
                  <div className="text-lg font-display font-bold">8.0 GB</div>
                </NeonCard>
              </div>

              <div className="bg-white/5 rounded-[2rem] p-6 border border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Memory Usage History</div>
                  <RefreshCw size={14} className="text-white/20" />
                </div>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="usage" stroke="#00F5FF" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Process Control</div>
                {[
                  { name: 'System Services', usage: '1.2 GB', status: 'Protected' },
                  { name: 'Background Apps', usage: '2.4 GB', status: 'Optimizable' },
                  { name: 'User Interface', usage: '0.6 GB', status: 'Active' },
                ].map((process) => (
                  <div key={process.name} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
                    <div>
                      <div className="text-sm font-bold">{process.name}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{process.usage} Occupied</div>
                    </div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${process.status === 'Optimizable' ? 'text-neon-cyan' : 'text-white/20'}`}>
                      {process.status}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!boosting && (
        <div className="pt-4">
          <NeonButton variant={ramUsage > 70 ? 'cyan' : 'green'} onClick={handleBoost} className="w-full flex items-center justify-center gap-3">
            <Zap size={20} /> {boosted ? 'RE-ACCELERATE' : 'BOOST RAM'}
          </NeonButton>
        </div>
      )}
    </motion.div>
  );
}
