
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3a00adf9f7684ff88df6948a4b7dab76',
  appName: 'Left Overs',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://3a00adf9-f768-4ff8-8df6-948a4b7dab76.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
  },
};

export default config;
