import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, StatusBadge } from '../components/UI';
import { Shield, ArrowLeft, User, Lock, Eye, EyeOff, Clock, Smartphone } from 'lucide-react';

export default function ParentalControl({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState(true);

  const restrictions = [
    { id: '1', name: 'App Usage Limit', value: '2h / day', icon: Clock, color: 'cyan' },
    { id: '2', name: 'Content Filtering', value: 'Strict', icon: Shield, color: 'purple' },
    { id: '3', name: 'Screen Time', value: '9 PM - 7 AM', icon: Lock, color: 'orange' },
    { id: '4', name: 'App Installation', value: 'Blocked', icon: Smartphone, color: 'red' },
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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Parental Control</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <NeonCard glowColor={active ? 'purple' : 'cyan'} className="flex flex-col items-center gap-6 py-10 bg-gradient-to-b from-neon-purple/5 to-transparent">
          <div className="w-24 h-24 rounded-full bg-neon-purple/10 flex items-center justify-center border border-neon-purple/30 shadow-[0_0_40px_rgba(191,0,255,0.2)]">
            <User size={48} className="text-neon-purple" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tighter">Child Profile</h2>
            <StatusBadge label={active ? 'Monitoring Active' : 'Monitoring Paused'} color={active ? 'purple' : 'cyan'} />
          </div>
        </NeonCard>

        <div className="flex flex-col gap-3">
          <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Active Restrictions</div>
          {restrictions.map((res) => (
            <div key={res.id} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-neon-${res.color}/10 flex items-center justify-center border border-neon-${res.color}/20`}>
                  <res.icon className={`text-neon-${res.color}`} size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{res.name}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">Enforced</div>
                </div>
              </div>
              <div className="text-sm font-display font-bold text-white">{res.value}</div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <NeonButton 
            variant={active ? 'cyan' : 'purple'} 
            onClick={() => setActive(!active)} 
            className="w-full flex items-center justify-center gap-3"
          >
            {active ? <EyeOff size={20} /> : <Eye size={20} />}
            {active ? 'PAUSE MONITORING' : 'RESUME MONITORING'}
          </NeonButton>
        </div>
      </div>
    </motion.div>
  );
}
