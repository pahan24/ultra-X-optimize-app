import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, StatusBadge } from '../components/UI';
import { Lock, ArrowLeft, ShieldCheck, Eye, MapPin, Mic, Camera, Smartphone, AlertTriangle, Search } from 'lucide-react';

export default function PrivacyGuard({ onBack }: { onBack: () => void }) {
  const [scanning, setScanning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const permissions = [
    { name: 'Location Access', count: 12, icon: MapPin, color: 'cyan', risk: 'Medium' },
    { name: 'Microphone', count: 5, icon: Mic, color: 'purple', risk: 'High' },
    { name: 'Camera', count: 8, icon: Camera, color: 'red', risk: 'High' },
    { name: 'Contacts', count: 15, icon: Smartphone, color: 'green', risk: 'Low' },
  ];

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setCompleted(true);
    }, 4000);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 pb-24 h-full">
      <div className="flex items-center gap-4 px-2">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white/50 hover:text-neon-cyan transition-all">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Privacy Guard</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          {scanning ? (
            <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12 gap-8">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-48 h-48 border-2 border-dashed border-neon-cyan/20 rounded-full flex items-center justify-center"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye size={64} className="text-neon-cyan animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-display font-bold text-neon-cyan uppercase tracking-[0.2em]">Auditing Privacy...</div>
                <p className="text-xs text-white/40">Checking app permissions & data leaks</p>
              </div>
            </motion.div>
          ) : completed ? (
            <motion.div key="completed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
              <NeonCard glowColor="green" className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-neon-green/5 to-transparent">
                <div className="w-20 h-20 bg-neon-green/10 rounded-full flex items-center justify-center border border-neon-green/30">
                  <ShieldCheck size={48} className="text-neon-green" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-display font-bold text-neon-green uppercase tracking-tighter">Privacy Audit Complete</h2>
                  <p className="text-xs text-white/40 mt-1">Found 3 high-risk permissions</p>
                </div>
              </NeonCard>

              <div className="flex flex-col gap-3">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold px-2">Risk Analysis</div>
                {permissions.map((perm) => (
                  <div key={perm.name} className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-neon-${perm.color}/10 flex items-center justify-center border border-neon-${perm.color}/20`}>
                        <perm.icon className={`text-neon-${perm.color}`} size={24} />
                      </div>
                      <div>
                        <div className="text-sm font-bold">{perm.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">{perm.count} Apps have access</div>
                      </div>
                    </div>
                    <StatusBadge label={perm.risk} color={perm.risk === 'High' ? 'red' : perm.risk === 'Medium' ? 'orange' : 'green'} />
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
              <NeonCard glowColor="cyan" className="flex flex-col items-center gap-4 py-8">
                <div className="w-20 h-20 bg-neon-cyan/10 rounded-full flex items-center justify-center border border-neon-cyan/30">
                  <Lock size={48} className="text-neon-cyan" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Protect Your Privacy</h2>
                  <p className="text-xs text-white/40 mt-2 px-8">Audit which apps are accessing your sensitive data like location, camera, and microphone.</p>
                </div>
              </NeonCard>

              <div className="grid grid-cols-2 gap-4">
                <NeonCard glowColor="purple" className="flex flex-col gap-2">
                  <Eye size={20} className="text-neon-purple" />
                  <div className="text-xs font-bold uppercase tracking-widest">Anti-Spy</div>
                  <div className="text-[10px] text-white/40">Block unauthorized access</div>
                </NeonCard>
                <NeonCard glowColor="green" className="flex flex-col gap-2">
                  <ShieldCheck size={20} className="text-neon-green" />
                  <div className="text-xs font-bold uppercase tracking-widest">Data Guard</div>
                  <div className="text-[10px] text-white/40">Secure your personal info</div>
                </NeonCard>
              </div>

              <div className="p-5 bg-neon-red/5 rounded-[1.5rem] border border-neon-red/20 flex items-center gap-4">
                <AlertTriangle className="text-neon-red" size={24} />
                <div className="flex-1">
                  <div className="text-xs font-bold text-neon-red uppercase tracking-widest">Privacy Warning</div>
                  <div className="text-[10px] text-white/40">5 apps are currently accessing your location in background.</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!scanning && !completed && (
        <div className="pt-4">
          <NeonButton variant="cyan" onClick={handleScan} className="w-full flex items-center justify-center gap-3">
            <Search size={20} /> START AUDIT
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
