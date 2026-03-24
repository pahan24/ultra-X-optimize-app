import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, StatusBadge } from '../components/UI';
import { Power, ArrowLeft, ShieldCheck, AlertCircle, ToggleLeft, ToggleRight, Smartphone, Zap } from 'lucide-react';

export default function StartupManager({ onBack }: { onBack: () => void }) {
  const [apps, setApps] = useState([
    { id: '1', name: 'System Core', enabled: true, impact: 'High', icon: Smartphone, color: 'cyan' },
    { id: '2', name: 'Social Connect', enabled: true, impact: 'Medium', icon: Zap, color: 'purple' },
    { id: '3', name: 'Cloud Sync', enabled: false, impact: 'Medium', icon: Zap, color: 'green' },
    { id: '4', name: 'Analytics Pro', enabled: true, impact: 'Low', icon: Zap, color: 'orange' },
    { id: '5', name: 'Update Service', enabled: true, impact: 'High', icon: Zap, color: 'red' },
  ]);

  const toggleApp = (id: string) => {
    setApps(apps.map(app => app.id === id ? { ...app, enabled: !app.enabled } : app));
  };

  const enabledCount = apps.filter(a => a.enabled).length;

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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Startup Manager</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <NeonCard glowColor="orange" className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-neon-orange/5 to-transparent">
          <div className="text-5xl font-display font-bold text-neon-orange tracking-tighter">{enabledCount}<span className="text-xl ml-1">Apps</span></div>
          <StatusBadge label="Auto-Start Enabled" color="orange" />
          <p className="text-xs text-white/40 text-center px-8">Disabling unnecessary apps can improve boot speed by 35%.</p>
        </NeonCard>

        <div className="flex flex-col gap-3">
          <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Startup Applications</div>
          {apps.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-neon-${app.color}/10 flex items-center justify-center border border-neon-${app.color}/20`}>
                  <app.icon className={`text-neon-${app.color}`} size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{app.name}</div>
                  <div className="flex items-center gap-2">
                    <div className={`text-[9px] font-bold uppercase tracking-widest ${
                      app.impact === 'High' ? 'text-neon-red' : 
                      app.impact === 'Medium' ? 'text-neon-orange' : 'text-neon-green'
                    }`}>
                      {app.impact} Impact
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => toggleApp(app.id)}
                className={`transition-all duration-300 ${app.enabled ? 'text-neon-cyan' : 'text-white/20'}`}
              >
                {app.enabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
              </button>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <NeonButton variant="orange" onClick={onBack} className="w-full flex items-center justify-center gap-3">
            <Power size={20} /> OPTIMIZE BOOT
          </NeonButton>
        </div>
      </div>
    </motion.div>
  );
}
