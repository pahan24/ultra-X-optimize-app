import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton, StatusBadge } from '../components/UI';
import { Clock, ArrowLeft, Calendar, Plus, Trash2, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight, Search } from 'lucide-react';

export default function TaskScheduler({ onBack }: { onBack: () => void }) {
  const [tasks, setTasks] = useState([
    { id: '1', name: 'Deep Junk Clean', time: 'Daily @ 02:00', enabled: true, icon: Trash2, color: 'purple' },
    { id: '2', name: 'Security Scan', time: 'Weekly @ Sun 03:00', enabled: true, icon: CheckCircle2, color: 'green' },
    { id: '3', name: 'Cloud Backup', time: 'Daily @ 04:00', enabled: false, icon: Calendar, color: 'cyan' },
    { id: '4', name: 'RAM Optimization', time: 'Every 4 Hours', enabled: true, icon: Clock, color: 'orange' },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, enabled: !task.enabled } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

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
        <h1 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Task Scheduler</h1>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <NeonCard glowColor="cyan" className="flex flex-col items-center gap-4 py-8 bg-gradient-to-b from-neon-cyan/5 to-transparent">
          <div className="text-5xl font-display font-bold text-neon-cyan tracking-tighter">{tasks.filter(t => t.enabled).length}<span className="text-xl ml-1">Active</span></div>
          <StatusBadge label="Scheduled Tasks" color="cyan" />
          <p className="text-xs text-white/40 text-center px-8">Automate your system maintenance for peak performance.</p>
        </NeonCard>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center px-2">
            <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Upcoming Tasks</div>
            <button className="text-[10px] text-neon-cyan font-bold uppercase tracking-widest flex items-center gap-1">
              <Plus size={12} /> Add Task
            </button>
          </div>
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div 
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-neon-${task.color}/10 flex items-center justify-center border border-neon-${task.color}/20`}>
                    <task.icon className={`text-neon-${task.color}`} size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{task.name}</div>
                    <div className="text-[9px] text-white/40 uppercase tracking-widest">{task.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`transition-all duration-300 ${task.enabled ? 'text-neon-cyan' : 'text-white/20'}`}
                  >
                    {task.enabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-white/10 hover:text-neon-red transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
