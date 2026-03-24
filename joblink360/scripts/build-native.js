// scripts/build-native.js
const { execSync } = require('child_process');
const fs = require('fs');

console.log('?? Building AMANDA Native Apps...\n');

// Step 1: Build web app
console.log('1. Building PWA...');
execSync('npm run build', { stdio: 'inherit' });
execSync('npm run export', { stdio: 'inherit' });

// Step 2: Sync Capacitor
console.log('\n2. Syncing Capacitor...');
execSync('npx cap sync', { stdio: 'inherit' });

// Step 3: Build Android
console.log('\n3. Building Android APK...');
execSync('npx cap open android', { stdio: 'inherit' });

console.log('\n? Native builds ready!');
console.log('   Android: Open in Android Studio and build APK/AAB');
console.log('   iOS: Open in Xcode and archive for App Store');
