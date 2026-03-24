import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NeonCard, NeonButton } from '../components/UI';
import { Smartphone, Zap, ArrowLeft, Search, Trash2, Settings, ExternalLink } from 'lucide-react';

import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AppManager({ onBack }: { onBack: () => void }) {
  const [search, setSearch] = useState('');
  const [apps, setApps] = useState([
    { id: '1', name: 'Facebook', package: 'com.facebook.katana', size: 450, type: 'user', icon: 'FB' },
    { id: '2', name: 'Instagram', package: 'com.instagram.android', size: 320, type: 'user', icon: 'IG' },
    { id: '3', name: 'WhatsApp', package: 'com.whatsapp', size: 180, type: 'user', icon: 'WA' },
    { id: '4', name: 'Spotify', package: 'com.spotify.music', size: 210, type: 'user', icon: 'SP' },
    { id: '5', name: 'YouTube', package: 'com.google.android.youtube', size: 550, type: 'system', icon: 'YT' },
    { id: '6', name: 'Chrome', package: 'com.android.chrome', size: 420, type: 'system', icon: 'CH' },
    { id: '7', name: 'TikTok', package: 'com.zhiliaoapp.musically', size: 380, type: 'user', icon: 'TT' },
    { id: '8', name: 'Snapchat', package: 'com.snapchat.android', size: 290, type: 'user', icon: 'SC' },
    { id: '9', name: 'Telegram', package: 'org.telegram.messenger', size: 150, type: 'user', icon: 'TG' },
    { id: '10', name: 'Netflix', package: 'com.netflix.mediaclient', size: 120, type: 'user', icon: 'NX' },
    { id: '11', name: 'Twitter', package: 'com.twitter.android', size: 240, type: 'user', icon: 'TW' },
    { id: '12', name: 'Messenger', package: 'com.facebook.orca', size: 310, type: 'user', icon: 'MS' },
    { id: '13', name: 'Gmail', package: 'com.google.android.gm', size: 110, type: 'system', icon: 'GM' },
    { id: '14', name: 'Maps', package: 'com.google.android.apps.maps', size: 280, type: 'system', icon: 'MP' },
    { id: '15', name: 'Photos', package: 'com.google.android.apps.photos', size: 340, type: 'system', icon: 'PH' },
    { id: '16', name: 'Drive', package: 'com.google.android.apps.docs', size: 190, type: 'system', icon: 'DR' },
    { id: '17', name: 'Calendar', package: 'com.google.android.calendar', size: 85, type: 'system', icon: 'CL' },
    { id: '18', name: 'Clock', package: 'com.google.android.deskclock', size: 45, type: 'system', icon: 'CK' },
    { id: '19', name: 'Calculator', package: 'com.google.android.calculator', size: 30, type: 'system', icon: 'CA' },
    { id: '20', name: 'Contacts', package: 'com.google.android.contacts', size: 65, type: 'system', icon: 'CT' },
  ]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchApps = async () => {
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.managerApps) {
            setApps(data.managerApps);
          }
        }
      } catch (err) {
        console.error('Error fetching apps:', err);
      }
    };
    fetchApps();
  }, [user]);

  const filteredApps = apps.filter(app => app.name.toLowerCase().includes(search.toLowerCase()));

  const handleUninstall = async (id: string) => {
    const newApps = apps.filter(app => app.id !== id);
    setApps(newApps);
    
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          managerApps: newApps,
          lastManagerAction: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.error('Error saving app list:', err);
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 pb-24 h-full">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-neon-cyan" />
        </button>
        <h1 className="text-2xl font-display font-bold text-neon-cyan uppercase">App Manager</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
        <input
          type="text"
          placeholder="Search apps..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-neon-cyan transition-colors"
        />
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
        <div className="flex justify-between items-center px-2">
          <div className="text-xs text-white/50 uppercase tracking-widest">{filteredApps.length} Apps Installed</div>
          <div className="flex gap-2">
            <button className="p-2 bg-white/5 rounded-lg text-white/50 hover:text-neon-cyan transition-colors">
              <Settings size={16} />
            </button>
          </div>
        </div>

        {filteredApps.map((app) => (
          <NeonCard key={app.id} glowColor={app.type === 'system' ? 'purple' : 'cyan'} className="flex items-center gap-4 py-3">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-display font-bold text-neon-cyan">
              {app.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">{app.name}</div>
              <div className="text-[10px] text-white/50">{app.package}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-white/50">{app.size} MB</span>
                {app.type === 'system' && <span className="text-[10px] bg-neon-purple/20 px-2 py-0.5 rounded-full text-neon-purple">System</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white/5 rounded-lg text-white/30 hover:text-neon-cyan transition-colors">
                <ExternalLink size={18} />
              </button>
              {app.type === 'user' && (
                <button onClick={() => handleUninstall(app.id)} className="p-2 hover:bg-white/5 rounded-lg text-white/30 hover:text-neon-red transition-colors">
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </NeonCard>
        ))}
      </div>

      <div className="pt-4">
        <NeonButton variant="cyan" onClick={onBack} className="w-full">OPTIMIZE ALL APPS</NeonButton>
      </div>
    </motion.div>
  );
}
