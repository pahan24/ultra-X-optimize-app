import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, StatusBadge } from '../components/UI';
import { Moon, ArrowLeft, ShieldCheck, Zap, Smartphone, Activity, Power } from 'lucide-react';

export default function AppHibernation({ onBack }: { onBack: () => void }) {
  const [hibernating, setHibernating] = useState(false);
  const [completed, setCompleted] = useState(false);

  const apps = [
    { name: 'Facebook', usage: '12% Battery', icon: 'FB', color: '#1877F2' },
    { name: 'Instagram', usage: '8% Battery', icon: 'IG', color: '#E4405F' },
    { name: 'TikTok', usage: '15% Battery', icon: 'TT', color: '#000000' },
    { name: 'YouTube', usage: '10% Battery', icon: 'YT', color: '#FF0000' },
  ];

  const handleHibernate = () => {
    setHibernating(true);
    setTimeout(() => {
      setHibernating(false);
      setCompleted(true);
    }, 3500);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 pb-24 h-full">
      <div className="flex items-center gap-4 px-2">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white/50 hover:text-neon-cyan transition-all">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">App Hibernation</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          {hibernating ? (
            <motion.div key="hibernating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12 gap-8">
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-neon-purple/20 rounded-full blur-3xl"
                />
                <Moon size={80} className="text-neon-purple animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-display font-bold text-neon-purple uppercase tracking-[0.2em]">Hibernating Apps...</div>
                <p className="text-xs text-white/40">Stopping background power drain</p>
              </div>
            </motion.div>
          ) : completed ? (
            <motion.div key="completed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 gap-6">
              <div className="w-32 h-32 bg-neon-purple/10 rounded-full flex items-center justify-center border border-neon-purple/30 shadow-[0_0_50px_rgba(191,0,255,0.2)]">
                <ShieldCheck size={64} className="text-neon-purple" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-neon-purple uppercase tracking-tighter">Apps Hibernated</h2>
                <p className="text-sm text-white/40 mt-2">Extended battery life by approx. 45 mins</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
              <NeonCard glowColor="purple" className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-neon-purple/5 to-transparent">
                <div className="text-5xl font-display font-bold text-neon-purple tracking-tighter">12<span className="text-xl ml-1">Apps</span></div>
                <StatusBadge label="Running in Background" color="purple" />
                <p className="text-xs text-white/40 text-center px-8 mt-2">These apps are consuming power even when not in use.</p>
              </NeonCard>

              <div className="flex flex-col gap-3">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">High Drain Apps</div>
                {apps.map((app) => (
                  <div key={app.name} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-lg"
                        style={{ backgroundColor: `${app.color}20`, color: app.color, border: `1px solid ${app.color}40` }}
                      >
                        {app.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{app.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">{app.usage}</div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-neon-purple/10 flex items-center justify-center border border-neon-purple/20">
                      <Power size={14} className="text-neon-purple" />
                    </div>
                  </div>
                ))}
              </div>

              <NeonCard glowColor="cyan" className="flex items-center gap-4">
                <Activity className="text-neon-cyan" size={24} />
                <div className="flex-1">
                  <div className="text-xs font-bold uppercase tracking-widest">Smart Hibernation</div>
                  <div className="text-[10px] text-white/40">Automatically hibernate apps when screen is off</div>
                </div>
                <div className="w-10 h-5 bg-neon-cyan/20 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-neon-cyan rounded-full" />
                </div>
              </NeonCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!hibernating && !completed && (
        <div className="pt-4">
          <NeonButton variant="purple" onClick={handleHibernate} className="w-full flex items-center justify-center gap-3">
            <Moon size={20} /> HIBERNATE ALL
          </NeonButton>
        </div>
      )}

      {completed && (
        <div className="pt-4">
          <NeonButton variant="outline" onClick={onBack} className="w-full">
            BACK TO DASHBOARD
          </NeonButton>
        </div>
      )}
    </motion.div>
  );
}
