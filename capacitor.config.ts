import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ultrax.performance',
  appName: 'Ultra X Performance Engine',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
