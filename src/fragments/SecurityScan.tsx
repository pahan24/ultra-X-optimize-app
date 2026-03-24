import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton } from '../components/UI';
import { Shield, ShieldCheck, ShieldAlert, ArrowLeft, Search, Lock, Eye, Globe, Smartphone } from 'lucide-react';

export default function SecurityScan({ onBack }: { onBack: () => void }) {
  const [scanning, setScanning] = useState(true);
  const [currentFile, setCurrentFile] = useState('Initializing...');
  const [threats, setThreats] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scanSteps = [
    'Scanning System Apps...',
    'Checking App Permissions...',
    'Analyzing Network Security...',
    'Verifying Root Integrity...',
    'Scanning External Storage...',
    'Checking for Malware...',
    'Finalizing Security Report...',
  ];

  useEffect(() => {
    if (scanning) {
      let step = 0;
      const interval = setInterval(() => {
        if (step < scanSteps.length) {
          setCurrentFile(scanSteps[step]);
          step++;
        } else {
          clearInterval(interval);
          setScanning(false);
          setCompleted(true);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 pb-24 h-full">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-neon-cyan" />
        </button>
        <h1 className="text-2xl font-display font-bold text-neon-cyan uppercase">Security Scan</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          {scanning ? (
            <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12 gap-8">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  className="w-48 h-48 border-2 border-dashed border-neon-cyan/30 rounded-full flex items-center justify-center"
                >
                  <div className="w-40 h-40 border-2 border-dashed border-neon-cyan/50 rounded-full" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield size={64} className="text-neon-cyan animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-xl font-display font-bold text-neon-cyan uppercase tracking-widest">Scanning System</div>
                <div className="text-sm text-white/50 h-5">{currentFile}</div>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '100%' }} 
                  transition={{ duration: 7, ease: 'linear' }} 
                  className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,245,255,0.5)]" 
                />
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
              <NeonCard glowColor="green" className="flex flex-col items-center gap-4 py-8">
                <div className="w-20 h-20 bg-neon-green/20 rounded-full flex items-center justify-center border border-neon-green/50">
                  <ShieldCheck size={48} className="text-neon-green" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-display font-bold text-neon-green uppercase">System Secure</h2>
                  <p className="text-xs text-white/50 mt-1">No threats or vulnerabilities found</p>
                </div>
              </NeonCard>

              <div className="grid grid-cols-2 gap-4">
                <NeonCard glowColor="cyan" className="flex flex-col gap-2 bg-white/5">
                  <Lock size={20} className="text-neon-cyan" />
                  <div className="text-xs font-bold uppercase tracking-widest">Privacy</div>
                  <div className="text-[10px] text-white/50">All apps verified</div>
                </NeonCard>
                <NeonCard glowColor="purple" className="flex flex-col gap-2 bg-white/5">
                  <Globe size={20} className="text-neon-purple" />
                  <div className="text-xs font-bold uppercase tracking-widest">Network</div>
                  <div className="text-[10px] text-white/50">Firewall active</div>
                </NeonCard>
              </div>

              <div className="flex flex-col gap-3">
                <div className="text-xs text-white/50 uppercase tracking-widest px-2">Security Details</div>
                {[
                  { label: 'App Security', status: 'Safe', icon: Smartphone, color: 'text-neon-green' },
                  { label: 'Payment Protection', status: 'Active', icon: Lock, color: 'text-neon-cyan' },
                  { label: 'Safe Browsing', status: 'Enabled', icon: Eye, color: 'text-neon-purple' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className="text-white/40" />
                      <div className="text-sm font-bold">{item.label}</div>
                    </div>
                    <div className={`text-xs font-display uppercase ${item.color}`}>{item.status}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {completed && (
        <div className="pt-4">
          <NeonButton variant="green" onClick={onBack} className="w-full uppercase">Finish Scan</NeonButton>
        </div>
      )}
    </motion.div>
  );
}
