import React from 'react';
import { motion } from 'motion/react';
import { NeonCard, NeonButton } from '../components/UI';
import { ArrowLeft } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function StorageAnalyzer({ onBack }: { onBack: () => void }) {
  const storageData = [
    { name: 'Apps', value: 45, color: '#00F5FF' },
    { name: 'Images', value: 15, color: '#BF00FF' },
    { name: 'Videos', value: 25, color: '#00FF88' },
    { name: 'Documents', value: 10, color: '#FF6B00' },
    { name: 'Other', value: 5, color: '#FF2D55' },
  ];

  const totalStorage = 256;
  const usedStorage = 115.2;
  const freeStorage = 140.8;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 pb-24 h-full">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-neon-cyan" />
        </button>
        <h1 className="text-2xl font-display font-bold text-neon-cyan uppercase">Storage Analyzer</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        <div className="flex justify-center py-4 relative">
          <div className="w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={storageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {storageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D0D14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-2xl font-display font-bold text-neon-cyan">45%</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest">Used</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <NeonCard glowColor="cyan" className="flex flex-col gap-1">
            <div className="text-[10px] text-white/50 uppercase tracking-widest">Used Space</div>
            <div className="text-xl font-display font-bold">{usedStorage} GB</div>
          </NeonCard>
          <NeonCard glowColor="green" className="flex flex-col gap-1">
            <div className="text-[10px] text-white/50 uppercase tracking-widest">Free Space</div>
            <div className="text-xl font-display font-bold">{freeStorage} GB</div>
          </NeonCard>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-xs text-white/50 uppercase tracking-widest px-2">Category Breakdown</div>
          {storageData.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <div className="text-sm font-bold">{item.name}</div>
                  <div className="text-[10px] text-white/50">{item.value}% of total</div>
                </div>
              </div>
              <div className="text-sm font-display" style={{ color: item.color }}>{(totalStorage * (item.value / 100)).toFixed(1)} GB</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <NeonButton variant="cyan" onClick={onBack} className="w-full">CLEAN STORAGE</NeonButton>
      </div>
    </motion.div>
  );
}
