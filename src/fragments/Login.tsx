import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db, signInAnonymously } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { NeonButton, NeonCard } from '../components/UI';
import { Zap, Sparkles, LogIn, Key, User as UserIcon } from 'lucide-react';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Sign in anonymously first to interact with Firestore
      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;

      const lowerUsername = username.toLowerCase();

      // 2. Handle 'ultrax' single-use key login
      if (lowerUsername === 'ultrax') {
        const keyDocRef = doc(db, 'access_keys', password);
        const keyDoc = await getDoc(keyDocRef);

        if (!keyDoc.exists()) {
          await auth.signOut();
          throw new Error('Invalid or expired access key.');
        }

        const keyData = keyDoc.data();
        if (keyData.usedAt) {
          await auth.signOut();
          throw new Error('This access key has already been used.');
        }

        // Mark key as used
        await updateDoc(keyDocRef, {
          usedAt: serverTimestamp(),
          usedBy: uid
        });

        // Create session for ultrax
        await setDoc(doc(db, 'sessions', uid), {
          uid,
          username: 'ultrax',
          role: 'user',
          lastLogin: serverTimestamp()
        });

        setIsLoading(false);
        return;
      }

      // 3. Handle 'admin' login (existing logic)
      const credDocRef = doc(db, 'credentials', lowerUsername);
      let credDoc = await getDoc(credDocRef);

      // First-time setup: If no credentials exist at all, create default admin
      if (!credDoc.exists() && lowerUsername === 'admin') {
        await setDoc(credDocRef, {
          username: 'admin',
          password: password,
          role: 'admin',
          createdAt: serverTimestamp()
        });
        credDoc = await getDoc(credDocRef);
      }

      // First-time setup or reset: If username is 'admin' and password is 'reset_admin_123', reset the admin password
      if (lowerUsername === 'admin' && password === 'reset_admin_123') {
        await setDoc(credDocRef, {
          username: 'admin',
          password: 'password123', // New default password
          role: 'admin',
          createdAt: serverTimestamp()
        });
        setError('Admin password has been reset to "password123". Please log in with the new password.');
        setIsLoading(false);
        return;
      }

      if (!credDoc.exists()) {
        await auth.signOut();
        throw new Error('Invalid username or password.');
      }

      const credData = credDoc.data();
      if (credData.password !== password) {
        await auth.signOut();
        throw new Error('Invalid username or password.');
      }

      // Create session for admin
      await setDoc(doc(db, 'sessions', uid), {
        uid,
        username: credData.username,
        role: credData.role,
        lastLogin: serverTimestamp()
      });

    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/admin-restricted-operation') {
        setError('ACTION REQUIRED: Anonymous Authentication is disabled in your Firebase Console. Please enable it in the "Authentication > Sign-in method" tab to allow the login system to function.');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] animate-pulse-glow" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 relative z-10"
      >
        {/* Logo Section */}
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 shadow-2xl relative group"
          >
            <Zap size={40} className="text-neon-cyan group-hover:scale-110 transition-transform duration-500" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute -inset-3 border border-dashed border-neon-cyan/20 rounded-full"
            />
          </motion.div>
          
          <div className="space-y-1">
            <h1 className="text-4xl font-display font-bold text-white tracking-tighter">
              ULTRA <span className="text-neon-cyan">X</span>
            </h1>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold">Peak Performance Engine</p>
          </div>
        </div>

        {/* Login Form */}
        <NeonCard glowColor="cyan" className="p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-display font-bold text-white tracking-tight">System Access</h2>
            <p className="text-white/40 text-xs">Enter your credentials to initialize the engine.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-2">Username</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-cyan transition-colors" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-neon-cyan/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-2">Password</label>
              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-cyan transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-neon-cyan/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-neon-red/10 border border-neon-red/20 rounded-xl text-neon-red text-[10px] text-center font-bold uppercase tracking-widest"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <NeonButton 
              variant="cyan" 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm font-bold uppercase tracking-widest">Initialize Engine</span>
                </>
              )}
            </NeonButton>
          </form>
        </NeonCard>

        {/* Footer Info */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 opacity-10">
            <div className="h-px w-12 bg-white" />
            <Sparkles size={12} className="text-white" />
            <div className="h-px w-12 bg-white" />
          </div>
          <p className="text-[8px] text-white/20 uppercase tracking-[0.5em] font-medium">Enterprise Grade Security & Optimization</p>
        </div>
      </motion.div>
    </div>
  );
}
