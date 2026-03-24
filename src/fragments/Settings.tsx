import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db, signOut } from '../firebase';
import { 
  doc, getDoc, setDoc, updateDoc, collection, addDoc, 
  serverTimestamp, getDocs, query, orderBy, limit, deleteDoc 
} from 'firebase/firestore';
import { NeonCard, NeonButton, cn } from '../components/UI';
import { 
  User, Bell, Moon, Zap, Shield, LogOut, ChevronLeft, 
  Settings as SettingsIcon, Sparkles, Smartphone, Info,
  CheckCircle2, AlertCircle, Key, Copy, Plus
} from 'lucide-react';

const ADMIN_EMAIL = "bpahan685@gmail.com";

export default function Settings({ onBack, userRole }: { onBack: () => void, userRole: string | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'dark',
    notificationsEnabled: true,
    autoOptimize: false,
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [systemPassword, setSystemPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [accessKeys, setAccessKeys] = useState<any[]>([]);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  const user = auth.currentUser;
  const isAdmin = userRole === 'admin' || user?.email === ADMIN_EMAIL;

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setSettings({
            theme: data.theme || 'dark',
            notificationsEnabled: data.notificationsEnabled ?? true,
            autoOptimize: data.autoOptimize ?? false,
          });
        }

        // Fetch current system password if admin
        if (isAdmin) {
          const credDoc = await getDoc(doc(db, 'credentials', 'ultrax'));
          if (credDoc.exists()) {
            setSystemPassword(credDoc.data().password || '');
          }
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
    if (isAdmin) {
      fetchAccessKeys();
    }
  }, [user, isAdmin]);

  const fetchAccessKeys = async () => {
    try {
      const q = query(collection(db, 'access_keys'), orderBy('createdAt', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const keys = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccessKeys(keys);
    } catch (err) {
      console.error('Error fetching access keys:', err);
    }
  };

  const generateAccessKey = async () => {
    if (!isAdmin) return;
    setIsGeneratingKey(true);
    try {
      // Generate a random key: ULTRA-XXXX-XXXX
      const randomPart = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      const newKey = `ULTRA-${randomPart()}-${randomPart()}`;
      
      await setDoc(doc(db, 'access_keys', newKey), {
        createdAt: serverTimestamp(),
        createdBy: user?.uid,
        usedAt: null,
        usedBy: null
      });
      
      await fetchAccessKeys();
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('Error generating key:', err);
      setSaveStatus('error');
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const deleteAccessKey = async (keyId: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'access_keys', keyId));
      await fetchAccessKeys();
    } catch (err) {
      console.error('Error deleting key:', err);
    }
  };

  const handleToggle = async (key: keyof typeof settings) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    
    if (!user) return;
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      await setDoc(doc(db, 'users', user.uid), {
        [key]: newValue,
      }, { merge: true });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('Error updating settings:', err);
      setSaveStatus('error');
      // Revert local state on error
      setSettings(prev => ({ ...prev, [key]: !newValue }));
    } finally {
      setIsSaving(false);
    }
  };

  const updateSystemPassword = async () => {
    if (!isAdmin || !systemPassword) return;
    setIsUpdatingPassword(true);
    setSaveStatus('idle');
    try {
      // Update the 'ultrax' user's password in the credentials collection
      await setDoc(doc(db, 'credentials', 'ultrax'), {
        username: 'ultrax',
        password: systemPassword,
        role: 'user',
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid
      }, { merge: true });
      
      setSaveStatus('success');
      setSystemPassword('');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('Error updating password:', err);
      setSaveStatus('error');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-neon-cyan/20 border-t-neon-cyan rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-8 pb-32"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2 pt-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group"
        >
          <ChevronLeft size={24} className="text-white/40 group-hover:text-neon-cyan transition-colors" />
        </motion.button>
        <h2 className="text-xl font-display font-bold text-white uppercase tracking-tighter">Settings</h2>
        <div className="w-12 h-12" /> {/* Spacer */}
      </div>

      {/* Profile Section */}
      <div className="px-2">
        <NeonCard glowColor="cyan" className="flex flex-col items-center gap-6 p-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse-glow" />
          
          <div className="relative">
            <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-2 border-neon-cyan/30 p-1 bg-bg-deep shadow-2xl">
              <img 
                src={user?.photoURL || 'https://picsum.photos/seed/user/200'} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-[1.8rem]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-neon-green border-4 border-bg-card flex items-center justify-center shadow-lg">
              <Shield size={14} className="text-white" />
            </div>
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-2xl font-display font-bold text-white tracking-tight">{user?.displayName || (isAdmin ? 'System Admin' : 'Elite User')}</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold">{user?.email || 'Anonymous Session'}</p>
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 text-center space-y-1">
              <div className="text-neon-cyan font-bold text-lg">{isAdmin ? 'ADMIN' : 'PRO'}</div>
              <div className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Status</div>
            </div>
            <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 text-center space-y-1">
              <div className="text-neon-green font-bold text-lg">99%</div>
              <div className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Trust</div>
            </div>
          </div>
        </NeonCard>
      </div>

      {/* Admin Tools Section */}
      {isAdmin && (
        <div className="flex flex-col gap-6 px-2">
          <div className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold px-2">Admin Control</div>
          
          <NeonCard glowColor="purple" className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
                <Shield className="text-neon-purple" size={24} />
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold text-white">System Password</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Set the global access key for users</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-purple transition-colors" size={18} />
                <input 
                  type="text" 
                  value={systemPassword}
                  onChange={(e) => setSystemPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-neon-purple/50 focus:bg-white/10 transition-all font-mono tracking-widest"
                />
              </div>

              <NeonButton 
                variant="purple" 
                onClick={updateSystemPassword}
                disabled={isUpdatingPassword || !systemPassword}
                className="w-full py-4 flex items-center justify-center gap-3"
              >
                {isUpdatingPassword ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap size={18} />
                    <span className="text-sm font-bold uppercase tracking-widest">Update System Password</span>
                  </>
                )}
              </NeonButton>
            </div>
          </NeonCard>

          {/* Access Key Generator */}
          <NeonCard glowColor="cyan" className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
                <Key className="text-neon-cyan" size={24} />
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold text-white">Access Key Generator</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Generate single-use keys for users</div>
              </div>
            </div>

            <div className="space-y-4">
              <NeonButton 
                variant="cyan" 
                onClick={generateAccessKey}
                disabled={isGeneratingKey}
                className="w-full py-4 flex items-center justify-center gap-3"
              >
                {isGeneratingKey ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Plus size={18} />
                    <span className="text-sm font-bold uppercase tracking-widest">Generate New Key</span>
                  </>
                )}
              </NeonButton>

              <div className="space-y-3">
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold px-1">Recent Keys</div>
                <div className="space-y-2">
                  {accessKeys.length === 0 ? (
                    <div className="text-center py-4 text-white/20 text-[10px] uppercase tracking-widest">No keys generated yet</div>
                  ) : (
                    accessKeys.map((key) => (
                      <div key={key.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-white tracking-wider">{key.id}</span>
                            {key.usedAt ? (
                              <span className="text-[8px] px-1.5 py-0.5 rounded bg-neon-red/10 text-neon-red border border-neon-red/20 font-bold uppercase">Used</span>
                            ) : (
                              <span className="text-[8px] px-1.5 py-0.5 rounded bg-neon-green/10 text-neon-green border border-neon-green/20 font-bold uppercase">Active</span>
                            )}
                          </div>
                          <div className="text-[8px] text-white/20 uppercase tracking-widest">
                            {key.createdAt?.toDate().toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!key.usedAt && (
                            <button 
                              onClick={() => copyToClipboard(key.id)}
                              className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-neon-cyan transition-all"
                            >
                              <Copy size={14} />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteAccessKey(key.id)}
                            className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-neon-red transition-all"
                          >
                            <Plus size={14} className="rotate-45" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </NeonCard>
        </div>
      )}

      {/* Settings Options */}
      <div className="flex flex-col gap-6 px-2">
        <div className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold px-2">Preferences</div>
        
        <div className="space-y-4">
          {[
            { 
              icon: Moon, 
              label: 'Dark Mode', 
              desc: 'High-contrast interface', 
              color: 'purple', 
              active: settings.theme === 'dark',
              onToggle: () => handleToggle('theme')
            },
            { 
              icon: Bell, 
              label: 'Notifications', 
              desc: 'Real-time system alerts', 
              color: 'cyan', 
              active: settings.notificationsEnabled,
              onToggle: () => handleToggle('notificationsEnabled')
            },
            { 
              icon: Zap, 
              label: 'Auto Optimize', 
              desc: 'Background performance boost', 
              color: 'green', 
              active: settings.autoOptimize,
              onToggle: () => handleToggle('autoOptimize')
            },
          ].map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="group flex items-center justify-between p-6 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all cursor-pointer relative overflow-hidden"
              onClick={item.onToggle}
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                  `bg-neon-${item.color}/10 border border-neon-${item.color}/20`
                )}>
                  <item.icon className={`text-neon-${item.color}`} size={28} />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-bold text-white group-hover:text-neon-cyan transition-colors">{item.label}</div>
                  <div className="text-[11px] text-white/40 uppercase tracking-widest font-bold">{item.desc}</div>
                </div>
              </div>
              
              <div className={cn(
                "w-14 h-8 rounded-full p-1 transition-all duration-500 relative",
                item.active ? `bg-neon-${item.color}/40` : "bg-white/10"
              )}>
                <motion.div 
                  animate={{ x: item.active ? 24 : 0 }}
                  className={cn(
                    "w-6 h-6 rounded-full shadow-lg",
                    item.active ? `bg-neon-${item.color}` : "bg-white/20"
                  )}
                />
              </div>

              {/* Hover Background Glow */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-r",
                `from-neon-${item.color} to-transparent`
              )} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col gap-6 px-2">
        <div className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold px-2">About</div>
        <div className="space-y-4">
          {[
            { icon: Info, label: 'Version', value: '4.0.0-Elite', color: 'cyan' },
            { icon: Smartphone, label: 'Engine', value: 'Ultra Core X', color: 'green' },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center justify-between p-6 bg-white/5 rounded-[2.5rem] border border-white/5">
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center",
                  `bg-neon-${item.color}/10 border border-neon-${item.color}/20`
                )}>
                  <item.icon className={`text-neon-${item.color}`} size={28} />
                </div>
                <div className="text-base font-bold text-white">{item.label}</div>
              </div>
              <div className="text-sm font-bold text-white/40 uppercase tracking-widest">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Action */}
      <div className="px-2 pt-4">
        <NeonButton 
          variant="red" 
          onClick={handleLogout}
          className="w-full py-6 flex items-center justify-center gap-4 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-base tracking-tight">Terminate Session</span>
        </NeonButton>
      </div>

      {/* Save Status Toast */}
      <AnimatePresence>
        {saveStatus !== 'idle' && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
          >
            <div className={cn(
              "px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl backdrop-blur-xl border",
              saveStatus === 'success' ? "bg-neon-green/20 border-neon-green/30 text-neon-green" : "bg-neon-red/20 border-neon-red/30 text-neon-red"
            )}>
              {saveStatus === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                {saveStatus === 'success' ? 'Settings Synchronized' : 'Sync Failed'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Footer */}
      <div className="text-center py-12 space-y-4">
        <div className="flex items-center justify-center gap-4 opacity-10">
          <div className="h-px w-12 bg-white" />
          <Sparkles size={12} className="text-white" />
          <div className="h-px w-12 bg-white" />
        </div>
        <p className="text-[8px] text-white/20 uppercase tracking-[0.5em] font-medium">Ultra Optimize X • Enterprise Edition</p>
      </div>
    </motion.div>
  );
}
