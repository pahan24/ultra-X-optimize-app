export type FragmentType = 'dashboard' | 'junk' | 'ram' | 'battery' | 'cpu' | 'storage' | 'apps' | 'game' | 'security' | 'network' | 'hibernation' | 'privacy' | 'settings' | 'sysinfo' | 'duplicate' | 'startup' | 'browser' | 'driver' | 'registry' | 'uninstaller' | 'shredder' | 'diskhealth' | 'vpn' | 'parental' | 'backup' | 'eventviewer' | 'resourcemonitor' | 'scheduler' | 'networkspeed';

export interface AppInfo {
  id: string;
  name: string;
  packageName: string;
  size: number;
  type: 'system' | 'user';
  lastUsed: string;
}

export interface JunkCategory {
  id: string;
  name: string;
  size: number;
  selected: boolean;
}

export interface RamDataPoint {
  time: string;
  usage: number;
}
