import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CircularGauge, NeonCard, NeonButton, StatusBadge, cn } from '../components/UI';
import { 
  Smartphone, Cpu, Battery, Database, Zap, ShieldCheck, 
  Gamepad2, Shield, Wifi, Search, Trash2, Moon, Lock, 
  Activity, BarChart3, Bell, Settings, ChevronRight, TrendingUp,
  Thermometer, Sparkles, Info, Copy, Play, Globe, HardDrive, 
  ShieldAlert, UserCheck, Cloud, List, Gauge, Calendar, Briefcase
} from 'lucide-react';

import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Dashboard({ onNavigate }: { onNavigate: (fragment: string) => void }) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [healthScore, setHealthScore] = useState(0);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchHealth = async () => {
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setHealthScore(userDoc.data().healthScore || 88);
        } else {
          setHealthScore(88);
        }
      } catch (err) {
        console.error('Error fetching health score:', err);
        setHealthScore(88);
      }
    };
    fetchHealth();
  }, [user]);

  const handleQuickOptimize = async () => {
    setIsOptimizing(true);
    setTimeout(async () => {
      setIsOptimizing(false);
      const newScore = 99;
      setHealthScore(newScore);
      
      if (user) {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            healthScore: newScore,
            lastOptimized: serverTimestamp()
          }, { merge: true });
        } catch (err) {
          console.error('Error saving health score:', err);
        }
      }
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 pb-32"
    >
      {/* Premium Header */}
      <div className="flex justify-between items-center px-2 pt-4">
        <div className="space-y-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
            <span className="text-[10px] text-neon-cyan font-bold uppercase tracking-[0.4em]">System Active</span>
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
            ULTRA <span className="text-neon-cyan">X</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative group"
          >
            <Bell size={20} className="text-white/40 group-hover:text-neon-cyan transition-colors" />
            <div className="absolute top-3 right-3 w-2 h-2 bg-neon-red rounded-full border-2 border-bg-deep" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate('settings')}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group"
          >
            <Settings size={20} className="text-white/40 group-hover:text-neon-cyan transition-colors" />
          </motion.button>
        </div>
      </div>

      {/* Device Details Section */}
      <div className="px-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
              <Smartphone size={20} className="text-neon-cyan" />
            </div>
            <div className="space-y-0.5">
              <div className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Device</div>
              <div className="text-xs font-bold text-white">Pixel 8 Pro</div>
            </div>
          </div>
          <div className="p-4 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
              <Cpu size={20} className="text-neon-purple" />
            </div>
            <div className="space-y-0.5">
              <div className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Processor</div>
              <div className="text-xs font-bold text-white">Tensor G3</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Health Section */}
      <div className="relative px-2">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-neon-purple/10 rounded-full blur-[120px] animate-pulse-glow" />
        
        <NeonCard glowColor={healthScore > 90 ? 'green' : 'cyan'} className="relative overflow-hidden py-12 flex flex-col items-center gap-10">
          <div className="relative flex items-center justify-center">
            <CircularGauge 
              value={healthScore} 
              size={240} 
              strokeWidth={14} 
              color={healthScore > 90 ? '#00FF88' : '#00F5FF'} 
              label="Health Index" 
            />
            
            <AnimatePresence>
              {isOptimizing && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="absolute inset-0 flex items-center justify-center bg-bg-card/90 backdrop-blur-xl rounded-full z-20"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <Zap size={48} className="text-neon-cyan animate-bounce" />
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute -inset-4 border-2 border-dashed border-neon-cyan/30 rounded-full"
                      />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-neon-cyan animate-pulse">Optimizing...</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center gap-6 w-full relative z-10">
            <div className="text-center space-y-2">
              <motion.h2 
                key={healthScore}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-display font-bold text-white uppercase tracking-tight"
              >
                {healthScore > 90 ? 'System Optimized' : 'Needs Attention'}
              </motion.h2>
              <div className="flex items-center justify-center gap-2 text-white/40">
                <Sparkles size={14} className="text-neon-cyan" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Last scan: 2m ago</span>
              </div>
            </div>
            
            <NeonButton 
              variant={healthScore > 90 ? 'green' : 'cyan'} 
              onClick={handleQuickOptimize}
              disabled={isOptimizing}
              className="w-full max-w-[260px] shadow-2xl"
            >
              {isOptimizing ? 'Processing...' : 'Quick Optimize'}
            </NeonButton>
          </div>
        </NeonCard>
      </div>

      {/* Core Vitals Grid */}
      <div className="grid grid-cols-3 gap-4 px-2">
        {[
          { icon: Cpu, label: 'RAM', value: healthScore > 90 ? '32%' : '72%', color: 'cyan', target: 'ram' },
          { icon: Database, label: 'Storage', value: '68%', color: 'purple', target: 'storage' },
          { icon: Battery, label: 'Battery', value: '82%', color: 'green', target: 'battery' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <NeonCard 
              glowColor={stat.color as any} 
              className="flex flex-col items-center gap-4 p-6 group"
              onClick={() => onNavigate(stat.target)}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                `bg-neon-${stat.color}/10 border border-neon-${stat.color}/20`
              )}>
                <stat.icon className={`text-neon-${stat.color}`} size={24} />
              </div>
              <div className="text-center space-y-1">
                <div className="text-xl font-display font-bold text-white">{stat.value}</div>
                <div className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
              </div>
            </NeonCard>
          </motion.div>
        ))}
      </div>

      {/* Elite Modules Section */}
      <div className="flex flex-col gap-6 px-2">
        <div className="flex justify-between items-end px-2">
          <div className="space-y-1">
            <div className="text-[10px] text-neon-cyan font-bold uppercase tracking-[0.4em]">Elite Tools</div>
            <h3 className="text-lg font-display font-bold text-white uppercase">Performance</h3>
          </div>
          <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest cursor-pointer hover:text-neon-cyan transition-colors">View All</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Gamepad2, label: 'Game Turbo', desc: 'Zero-lag mode', color: 'green', target: 'game' },
            { icon: Shield, label: 'Security', desc: 'Threat scan', color: 'red', target: 'security' },
            { icon: Trash2, label: 'Cleaner', desc: 'Deep junk removal', color: 'purple', target: 'junk' },
            { icon: Thermometer, label: 'Cooler', desc: 'CPU Temp control', color: 'orange', target: 'cpu' },
          ].map((module, i) => (
            <motion.div
              key={module.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <NeonCard glowColor={module.color as any} className="flex flex-col gap-5 p-6 group" onClick={() => onNavigate(module.target)}>
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:shadow-lg",
                  `bg-neon-${module.color}/10 border border-neon-${module.color}/20`
                )}>
                  <module.icon className={`text-neon-${module.color}`} size={28} />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white group-hover:text-neon-cyan transition-colors">{module.label}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-medium">{module.desc}</div>
                </div>
              </NeonCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Advanced Utilities List */}
      <div className="flex flex-col gap-6 px-2">
        <div className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold px-2">System Diagnostics</div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Info, label: 'System Info', desc: 'Hardware specs', color: 'cyan', target: 'sysinfo' },
            { icon: HardDrive, label: 'Disk Health', desc: 'S.M.A.R.T status', color: 'green', target: 'diskhealth' },
            { icon: List, label: 'Event Logs', desc: 'System events', color: 'orange', target: 'eventviewer' },
            { icon: Gauge, label: 'Resources', desc: 'Live monitoring', color: 'purple', target: 'resourcemonitor' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <NeonCard glowColor={item.color as any} className="flex flex-col gap-4 p-5 group" onClick={() => onNavigate(item.target)}>
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                  `bg-neon-${item.color}/10 border border-neon-${item.color}/20`
                )}>
                  <item.icon className={`text-neon-${item.color}`} size={24} />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white group-hover:text-neon-cyan transition-colors">{item.label}</div>
                  <div className="text-[9px] text-white/40 uppercase tracking-widest font-medium">{item.desc}</div>
                </div>
              </NeonCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 px-2">
        <div className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold px-2">Maintenance Suite</div>
        <div className="space-y-4">
          {[
            { icon: Play, label: 'Startup Manager', desc: 'Optimize boot time', color: 'cyan', target: 'startup' },
            { icon: Briefcase, label: 'Driver Status', desc: 'Update system drivers', color: 'green', target: 'driver' },
            { icon: Sparkles, label: 'Registry Scan', desc: 'Repair registry keys', color: 'purple', target: 'registry' },
            { icon: Calendar, label: 'Task Scheduler', desc: 'Automate maintenance', color: 'orange', target: 'scheduler' },
            { icon: Copy, label: 'Duplicate Finder', desc: 'Remove redundant files', color: 'cyan', target: 'duplicate' },
            { icon: Globe, label: 'Browser Cleaner', desc: 'Clear history & cache', color: 'green', target: 'browser' },
            { icon: Trash2, label: 'Uninstaller', desc: 'Remove unused apps', color: 'red', target: 'uninstaller' },
            { icon: ShieldAlert, label: 'File Shredder', desc: 'Permanent deletion', color: 'red', target: 'shredder' },
          ].map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.05 }}
              className="group flex items-center justify-between p-5 bg-white/5 rounded-[2rem] border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => onNavigate(item.target)}
            >
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                  `bg-neon-${item.color}/10 border border-neon-${item.color}/20`
                )}>
                  <item.icon className={`text-neon-${item.color}`} size={24} />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white group-hover:text-neon-cyan transition-colors">{item.label}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{item.desc}</div>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/20 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 px-2">
        <div className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold px-2">Security & Privacy</div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, label: 'VPN', target: 'vpn', color: 'green' },
            { icon: UserCheck, label: 'Parental', target: 'parental', color: 'purple' },
            { icon: Cloud, label: 'Backup', target: 'backup', color: 'cyan' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <NeonCard glowColor={item.color as any} className="flex flex-col items-center gap-3 p-5 group" onClick={() => onNavigate(item.target)}>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                  `bg-neon-${item.color}/10 border border-neon-${item.color}/20`
                )}>
                  <item.icon className={`text-neon-${item.color}`} size={20} />
                </div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest font-bold text-center">{item.label}</div>
              </NeonCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Advanced Utilities List */}
      <div className="flex flex-col gap-6 px-2">
        <div className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold px-2">Advanced Utilities</div>
        <div className="space-y-4">
          {[
            { icon: Moon, label: 'App Hibernation', desc: 'Stop background power drain', color: 'purple', target: 'hibernation' },
            { icon: Lock, label: 'Privacy Guard', desc: 'Audit app permissions', color: 'cyan', target: 'privacy' },
            { icon: Wifi, label: 'Network Boost', desc: 'Optimize connection speed', color: 'green', target: 'network' },
            { icon: Gauge, label: 'Speed Test', desc: 'Check network speed', color: 'cyan', target: 'networkspeed' },
          ].map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="group flex items-center justify-between p-6 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden"
              onClick={() => onNavigate(item.target)}
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                  `bg-neon-${item.color}/10 border border-neon-${item.color}/20`
                )}>
                  <item.icon className={`text-neon-${item.color}`} size={28} />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-bold text-white group-hover:text-neon-cyan transition-colors">{item.label}</div>
                  <div className="text-[11px] text-white/40 uppercase tracking-widest font-bold">{item.desc}</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-white/20 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all relative z-10" />
              
              {/* Hover Background Glow */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-r",
                `from-neon-${item.color} to-transparent`
              )} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Analytics & Report Card */}
      <div className="px-2">
        <NeonCard glowColor="cyan" className="flex flex-col gap-8 bg-gradient-to-br from-neon-cyan/5 to-transparent p-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="text-xl font-display font-bold text-white">Weekly Insight</h4>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Performance Stability</div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green">
              <TrendingUp size={16} />
              <span className="text-xs font-bold">+12.4%</span>
            </div>
          </div>
          
          <div className="relative h-32 px-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
              ))}
              
              {/* Line Chart Path */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 0 60 L 16 35 L 32 55 L 48 20 L 64 45 L 80 10 L 100 15"
                fill="none"
                stroke="url(#chartGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]"
              />
              
              {/* Area under the line */}
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                d="M 0 60 L 16 35 L 32 55 L 48 20 L 64 45 L 80 10 L 100 15 L 100 100 L 0 100 Z"
                fill="url(#areaGradient)"
                stroke="none"
              />

              {/* Data Points */}
              {[
                { x: 0, y: 60 }, { x: 16, y: 35 }, { x: 32, y: 55 }, 
                { x: 48, y: 20 }, { x: 64, y: 45 }, { x: 80, y: 10 }, { x: 100, y: 15 }
              ].map((p, i) => (
                <motion.circle
                  key={i}
                  initial={{ r: 0 }}
                  animate={{ r: 2.5 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  cx={p.x}
                  cy={p.y}
                  fill={i === 5 ? "#00F5FF" : "white"}
                  className={i === 5 ? "drop-shadow-[0_0_5px_rgba(0,245,255,1)]" : ""}
                />
              ))}

              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00F5FF" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00F5FF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Day Labels */}
            <div className="absolute -bottom-6 left-0 w-full flex justify-between px-2">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => (
                <span key={day} className="text-[9px] text-white/20 font-bold uppercase tracking-tighter">{day}</span>
              ))}
            </div>
          </div>
        </NeonCard>
      </div>

      {/* Premium Footer */}
      <div className="text-center py-12 space-y-4">
        <div className="flex items-center justify-center gap-4 opacity-20">
          <div className="h-px w-12 bg-white" />
          <div className="text-[10px] uppercase tracking-[0.6em] font-bold">Ultra Core v4.0</div>
          <div className="h-px w-12 bg-white" />
        </div>
        <p className="text-[8px] text-white/20 uppercase tracking-widest font-medium">Designed for peak performance & elegance</p>
      </div>
    </motion.div>
  );
}
