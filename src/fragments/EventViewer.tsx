import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, StatusBadge } from '../components/UI';
import { Activity, ArrowLeft, AlertCircle, Info, ShieldAlert, Clock, Search } from 'lucide-react';

export default function EventViewer({ onBack }: { onBack: () => void }) {
  const [loading, setLoading] = useState(true);

  const events = [
    { id: '1', type: 'Critical', msg: 'Unauthorized login attempt blocked', time: '10:22:45', icon: ShieldAlert, color: 'red' },
    { id: '2', type: 'Warning', msg: 'CPU temperature exceeded 85°C', time: '09:15:12', icon: AlertCircle, color: 'orange' },
    { id: '3', type: 'Info', msg: 'System update UX-2024-03-24 applied', time: '08:00:00', icon: Info, color: 'cyan' },
    { id: '4', type: 'Info', msg: 'RAM optimization completed', time: '07:45:22', icon: Activity, color: 'green' },
    { id: '5', type: 'Warning', msg: 'Low battery (15%) detected', time: '06:30:10', icon: AlertCircle, color: 'orange' },
    { id: '6', type: 'Info', msg: 'Cloud sync successful', time: '05:00:00', icon: Info, color: 'cyan' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">System Event Viewer</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
          <input 
            type="text" 
            placeholder="Search system logs..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-neon-cyan/50 transition-all"
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-12 h-12 border-2 border-neon-cyan/20 border-t-neon-cyan rounded-full"
            />
            <div className="text-[10px] text-neon-cyan font-bold uppercase tracking-[0.4em] animate-pulse">Reading Logs...</div>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 p-5 bg-white/5 rounded-[1.5rem] border border-white/5 hover:bg-white/10 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl bg-neon-${event.color}/10 flex items-center justify-center border border-neon-${event.color}/20 flex-shrink-0`}>
                  <event.icon className={`text-neon-${event.color}`} size={20} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-widest text-neon-${event.color}`}>{event.type}</span>
                    <div className="flex items-center gap-1 text-[9px] text-white/20 font-bold">
                      <Clock size={10} />
                      {event.time}
                    </div>
                  </div>
                  <div className="text-sm text-white/80 leading-tight">{event.msg}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
