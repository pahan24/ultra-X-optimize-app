import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NeonCard, NeonButton, CircularGauge, cn } from '../components/UI';
import { Wifi, ArrowUp, ArrowDown, Activity, Globe, Zap, ChevronLeft } from 'lucide-react';

export default function NetworkSpeed({ onBack }: { onBack: () => void }) {
  const [isTesting, setIsTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [progress, setProgress] = useState(0);

  const startTest = () => {
    setIsTesting(true);
    setProgress(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      if (currentProgress <= 40) {
        setPing(Math.floor(Math.random() * 20) + 10);
      } else if (currentProgress <= 70) {
        setDownloadSpeed(Math.floor(Math.random() * 150) + 50);
      } else if (currentProgress <= 100) {
        setUploadSpeed(Math.floor(Math.random() * 50) + 20);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsTesting(false);
      }
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 pb-32"
    >
      <div className="px-2 pt-4 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group"
        >
          <ChevronLeft size={20} className="text-white/40 group-hover:text-neon-cyan transition-colors" />
        </motion.button>
        <div>
          <div className="text-[10px] text-neon-cyan font-bold uppercase tracking-[0.4em] mb-1">Connectivity</div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tighter uppercase">
            Network <span className="text-neon-cyan">Speed</span>
          </h1>
        </div>
      </div>

      <div className="px-2">
        <NeonCard glowColor="cyan" className="py-12 flex flex-col items-center gap-10">
          <div className="relative flex items-center justify-center">
            <CircularGauge 
              value={isTesting ? progress : downloadSpeed} 
              size={240} 
              strokeWidth={14} 
              color="#00F5FF" 
              label={isTesting ? "Testing..." : "Download"} 
              unit={isTesting ? "%" : "Mbps"}
            />
            {isTesting && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute -inset-4 border-2 border-dashed border-neon-cyan/30 rounded-full"
              />
            )}
          </div>

          <div className="grid grid-cols-3 gap-6 w-full px-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
                <Activity size={20} className="text-neon-purple" />
              </div>
              <div className="text-center">
                <div className="text-lg font-display font-bold text-white">{ping || '--'}</div>
                <div className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Ping (ms)</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                <ArrowDown size={20} className="text-neon-green" />
              </div>
              <div className="text-center">
                <div className="text-lg font-display font-bold text-white">{downloadSpeed || '--'}</div>
                <div className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Down (Mbps)</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
                <ArrowUp size={20} className="text-neon-cyan" />
              </div>
              <div className="text-center">
                <div className="text-lg font-display font-bold text-white">{uploadSpeed || '--'}</div>
                <div className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Up (Mbps)</div>
              </div>
            </div>
          </div>

          <NeonButton 
            variant="cyan" 
            onClick={startTest}
            disabled={isTesting}
            className="w-full max-w-[260px]"
          >
            {isTesting ? 'Testing Network...' : 'Start Speed Test'}
          </NeonButton>
        </NeonCard>
      </div>

      <div className="px-2 space-y-4">
        <div className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold px-2">Network Details</div>
        <div className="grid grid-cols-1 gap-4">
          {[
            { icon: Globe, label: 'IP Address', value: '192.168.1.45', color: 'cyan' },
            { icon: Wifi, label: 'SSID', value: 'UltraX_5G_Elite', color: 'green' },
            { icon: Zap, label: 'Gateway', value: '192.168.1.1', color: 'purple' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  `bg-neon-${item.color}/10 border border-neon-${item.color}/20`
                )}>
                  <item.icon className={`text-neon-${item.color}`} size={20} />
                </div>
                <div>
                  <div className="text-[8px] text-white/40 uppercase tracking-widest font-bold">{item.label}</div>
                  <div className="text-sm font-bold text-white">{item.value}</div>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
