import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonCard, NeonButton } from '../components/UI';
import { Gamepad2, Zap, ArrowLeft, ShieldCheck, BellOff, Cpu, Activity, Trophy } from 'lucide-react';

import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function GameBooster({ onBack }: { onBack: () => void }) {
  const [isBoosting, setIsBoosting] = useState(false);
  const [isBoosted, setIsBoosted] = useState(false);
  const [dndEnabled, setDndEnabled] = useState(true);
  const user = auth.currentUser;

  React.useEffect(() => {
    const fetchGameSettings = async () => {
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setIsBoosted(data.isGameBoosted || false);
          setDndEnabled(data.dndEnabled ?? true);
        }
      } catch (err) {
        console.error('Error fetching game settings:', err);
      }
    };
    fetchGameSettings();
  }, [user]);

  const handleBoost = async () => {
    setIsBoosting(true);
    setTimeout(async () => {
      setIsBoosting(false);
      setIsBoosted(true);
      
      if (user) {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            isGameBoosted: true,
            lastGameBoost: serverTimestamp()
          }, { merge: true });
        } catch (err) {
          console.error('Error saving game boost state:', err);
        }
      }
    }, 3500);
  };

  const toggleDnd = async () => {
    const newValue = !dndEnabled;
    setDndEnabled(newValue);
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          dndEnabled: newValue
        }, { merge: true });
      } catch (err) {
        console.error('Error saving DND state:', err);
      }
    }
  };

  const [games, setApps] = useState([
    { name: 'PUBG Mobile', icon: 'PM', color: '#FFD700' },
    { name: 'Genshin Impact', icon: 'GI', color: '#00F5FF' },
    { name: 'Call of Duty', icon: 'CD', color: '#FF6B00' },
    { name: 'Mobile Legends', icon: 'ML', color: '#BF00FF' },
    { name: 'Free Fire', icon: 'FF', color: '#FF4500' },
    { name: 'Asphalt 9', icon: 'A9', color: '#1E90FF' },
    { name: 'Minecraft', icon: 'MC', color: '#32CD32' },
    { name: 'Roblox', icon: 'RB', color: '#FF0000' },
  ]);

  React.useEffect(() => {
    const fetchGameSettings = async () => {
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setIsBoosted(data.isGameBoosted || false);
          setDndEnabled(data.dndEnabled ?? true);
          if (data.games) {
            setApps(data.games);
          }
        }
      } catch (err) {
        console.error('Error fetching game settings:', err);
      }
    };
    fetchGameSettings();
  }, [user]);

  const handleAddGame = async () => {
    const name = prompt('Enter game name:');
    if (name) {
      const icon = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
      const color = '#' + Math.floor(Math.random()*16777215).toString(16);
      const newGames = [...games, { name, icon, color }];
      setApps(newGames);
      
      if (user) {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            games: newGames
          }, { merge: true });
        } catch (err) {
          console.error('Error saving game list:', err);
        }
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 pb-24 h-full">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-neon-cyan" />
        </button>
        <h1 className="text-2xl font-display font-bold text-neon-cyan uppercase">Game Booster</h1>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        {/* Main Status */}
        <NeonCard glowColor={isBoosted ? 'green' : 'cyan'} className="relative overflow-hidden py-8 flex flex-col items-center gap-4">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Trophy size={120} />
          </div>
          <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${isBoosted ? 'border-neon-green text-neon-green shadow-[0_0_20px_rgba(0,255,136,0.4)]' : 'border-neon-cyan text-neon-cyan shadow-[0_0_20px_rgba(0,245,255,0.4)]'}`}>
            <Zap size={48} className={isBoosting ? 'animate-bounce' : ''} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-display font-bold uppercase tracking-widest">
              {isBoosted ? 'Gaming Mode Active' : 'System Ready'}
            </h2>
            <p className="text-xs text-white/50 mt-1">
              {isBoosted ? 'Performance maximized for gaming' : 'Boost to stabilize FPS and reduce lag'}
            </p>
          </div>
        </NeonCard>

        {/* Quick Settings */}
        <div className="grid grid-cols-2 gap-4">
          <NeonCard 
            glowColor={dndEnabled ? 'purple' : 'cyan'} 
            onClick={toggleDnd}
            className={`flex flex-col items-center gap-2 transition-all ${dndEnabled ? 'bg-neon-purple/10 border-neon-purple/40' : 'bg-white/5'}`}
          >
            <BellOff size={24} className={dndEnabled ? 'text-neon-purple' : 'text-white/30'} />
            <div className="text-center">
              <div className="text-sm font-bold">DND Mode</div>
              <div className={`text-[10px] uppercase tracking-widest ${dndEnabled ? 'text-neon-purple' : 'text-white/30'}`}>
                {dndEnabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </NeonCard>
          <NeonCard glowColor="cyan" className="flex flex-col items-center gap-2 bg-white/5">
            <Cpu size={24} className="text-neon-cyan" />
            <div className="text-center">
              <div className="text-sm font-bold">GPU Turbo</div>
              <div className="text-[10px] text-neon-cyan uppercase tracking-widest">Always On</div>
            </div>
          </NeonCard>
        </div>

        {/* Game List */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center px-2">
            <div className="text-xs text-white/50 uppercase tracking-widest">My Games</div>
            <button onClick={handleAddGame} className="text-[10px] text-neon-cyan uppercase tracking-widest font-bold">+ Add Game</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {games.map((game) => (
              <div key={game.name} className="bg-bg-card border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 group cursor-pointer hover:border-neon-cyan/50 transition-all">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-xl shadow-lg"
                  style={{ backgroundColor: `${game.color}20`, color: game.color, border: `1px solid ${game.color}40` }}
                >
                  {game.icon}
                </div>
                <div className="text-xs font-bold text-center group-hover:text-neon-cyan transition-colors">{game.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Simulation */}
        <NeonCard glowColor="cyan" className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-neon-cyan" />
            <span className="text-xs font-bold uppercase tracking-widest">Performance Stats</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/50">Average FPS</span>
              <span className="text-sm font-display text-neon-green">60.2</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-neon-green w-[95%]" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/50">Network Ping</span>
              <span className="text-sm font-display text-neon-cyan">24ms</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-neon-cyan w-[20%]" />
            </div>
          </div>
        </NeonCard>
      </div>

      <div className="pt-4">
        <AnimatePresence mode="wait">
          {isBoosting ? (
            <motion.div key="boosting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3.5 }} className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,245,255,0.5)]" />
              </div>
              <div className="text-xl font-display font-bold text-neon-cyan animate-pulse uppercase tracking-widest">Optimizing for Gaming...</div>
            </motion.div>
          ) : (
            <NeonButton variant={isBoosted ? 'green' : 'cyan'} onClick={handleBoost} className="w-full">
              {isBoosted ? 'RE-OPTIMIZE' : 'BOOST NOW'}
            </NeonButton>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
