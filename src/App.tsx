import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home, Database, Smartphone, Settings as SettingsIcon, Zap, Gamepad2, Shield, Wifi } from 'lucide-react';
import Dashboard from './fragments/Dashboard';
import JunkCleaner from './fragments/JunkCleaner';
import RAMBooster from './fragments/RAMBooster';
import BatterySaver from './fragments/BatterySaver';
import CPUCooler from './fragments/CPUCooler';
import StorageAnalyzer from './fragments/StorageAnalyzer';
import AppManager from './fragments/AppManager';
import GameBooster from './fragments/GameBooster';
import SecurityScan from './fragments/SecurityScan';
import NetworkOptimizer from './fragments/NetworkOptimizer';
import AppHibernation from './fragments/AppHibernation';
import PrivacyGuard from './fragments/PrivacyGuard';
import SysInfo from './fragments/SysInfo';
import DuplicateFinder from './fragments/DuplicateFinder';
import StartupManager from './fragments/StartupManager';
import BrowserCleaner from './fragments/BrowserCleaner';
import DriverStatus from './fragments/DriverStatus';
import RegistryScan from './fragments/RegistryScan';
import Uninstaller from './fragments/Uninstaller';
import FileShredder from './fragments/FileShredder';
import DiskHealth from './fragments/DiskHealth';
import VPNStatus from './fragments/VPNStatus';
import ParentalControl from './fragments/ParentalControl';
import BackupStatus from './fragments/BackupStatus';
import EventViewer from './fragments/EventViewer';
import ResourceMonitor from './fragments/ResourceMonitor';
import TaskScheduler from './fragments/TaskScheduler';
import NetworkSpeed from './fragments/NetworkSpeed';
import Login from './fragments/Login';
import Settings from './fragments/Settings';
import { FragmentType } from './types';
import { auth, onAuthStateChanged, User, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function App() {
  const [activeFragment, setActiveFragment] = useState<FragmentType>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch session to get role
        try {
          const sessionDoc = await getDoc(doc(db, 'sessions', currentUser.uid));
          if (sessionDoc.exists()) {
            setUserRole(sessionDoc.data().role);
          } else {
            // If no session exists (e.g. legacy user), default to 'user'
            setUserRole('user');
          }
        } catch (err) {
          console.error('Error fetching session:', err);
          setUserRole('user');
        }
      } else {
        setUserRole(null);
      }
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const renderFragment = () => {
    switch (activeFragment) {
      case 'dashboard':
        return <Dashboard onNavigate={(f) => setActiveFragment(f as FragmentType)} />;
      case 'junk':
        return <JunkCleaner onBack={() => setActiveFragment('dashboard')} />;
      case 'ram':
        return <RAMBooster onBack={() => setActiveFragment('dashboard')} />;
      case 'battery':
        return <BatterySaver onBack={() => setActiveFragment('dashboard')} />;
      case 'cpu':
        return <CPUCooler onBack={() => setActiveFragment('dashboard')} />;
      case 'storage':
        return <StorageAnalyzer onBack={() => setActiveFragment('dashboard')} />;
      case 'apps':
        return <AppManager onBack={() => setActiveFragment('dashboard')} />;
      case 'game':
        return <GameBooster onBack={() => setActiveFragment('dashboard')} />;
      case 'security':
        return <SecurityScan onBack={() => setActiveFragment('dashboard')} />;
      case 'network':
        return <NetworkOptimizer onBack={() => setActiveFragment('dashboard')} />;
      case 'hibernation':
        return <AppHibernation onBack={() => setActiveFragment('dashboard')} />;
      case 'privacy':
        return <PrivacyGuard onBack={() => setActiveFragment('dashboard')} />;
      case 'sysinfo':
        return <SysInfo onBack={() => setActiveFragment('dashboard')} />;
      case 'duplicate':
        return <DuplicateFinder onBack={() => setActiveFragment('dashboard')} />;
      case 'startup':
        return <StartupManager onBack={() => setActiveFragment('dashboard')} />;
      case 'browser':
        return <BrowserCleaner onBack={() => setActiveFragment('dashboard')} />;
      case 'driver':
        return <DriverStatus onBack={() => setActiveFragment('dashboard')} />;
      case 'registry':
        return <RegistryScan onBack={() => setActiveFragment('dashboard')} />;
      case 'uninstaller':
        return <Uninstaller onBack={() => setActiveFragment('dashboard')} />;
      case 'shredder':
        return <FileShredder onBack={() => setActiveFragment('dashboard')} />;
      case 'diskhealth':
        return <DiskHealth onBack={() => setActiveFragment('dashboard')} />;
      case 'vpn':
        return <VPNStatus onBack={() => setActiveFragment('dashboard')} />;
      case 'parental':
        return <ParentalControl onBack={() => setActiveFragment('dashboard')} />;
      case 'backup':
        return <BackupStatus onBack={() => setActiveFragment('dashboard')} />;
      case 'eventviewer':
        return <EventViewer onBack={() => setActiveFragment('dashboard')} />;
      case 'resourcemonitor':
        return <ResourceMonitor onBack={() => setActiveFragment('dashboard')} />;
      case 'scheduler':
        return <TaskScheduler onBack={() => setActiveFragment('dashboard')} />;
      case 'networkspeed':
        return <NetworkSpeed onBack={() => setActiveFragment('dashboard')} />;
      case 'settings':
        return <Settings onBack={() => setActiveFragment('dashboard')} userRole={userRole} />;
      default:
        return <Dashboard onNavigate={(f) => setActiveFragment(f as FragmentType)} />;
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-bg-deep flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-12 h-12 border-4 border-neon-cyan/20 border-t-neon-cyan rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-bg-deep text-white font-body selection:bg-neon-cyan/30 flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-neon-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-neon-purple/5 blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <main className="flex-1 p-6 relative z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFragment}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderFragment()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-bg-card/80 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex justify-between items-center z-50">
        <NavButton
          active={activeFragment === 'dashboard'}
          onClick={() => setActiveFragment('dashboard')}
          icon={<Home size={24} />}
          label="Home"
        />
        <NavButton
          active={activeFragment === 'game'}
          onClick={() => setActiveFragment('game')}
          icon={<Gamepad2 size={24} />}
          label="Turbo"
        />
        <NavButton
          active={activeFragment === 'security'}
          onClick={() => setActiveFragment('security')}
          icon={<Shield size={24} />}
          label="Safe"
        />
        <NavButton
          active={activeFragment === 'settings'}
          onClick={() => setActiveFragment('settings')}
          icon={<SettingsIcon size={24} />}
          label="Elite"
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-neon-cyan scale-110' : 'text-white/30 hover:text-white/60'}`}
    >
      <div className={`relative ${active ? 'neon-glow-cyan' : ''}`}>
        {icon}
        {active && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-cyan rounded-full"
          />
        )}
      </div>
      <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
    </button>
  );
}
