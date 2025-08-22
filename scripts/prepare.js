const fs = require('fs-extra');
const path = require('path');

// Ensure the bin script is executable
const binPath = path.join(__dirname, '..', 'bin', 'create-react-vite-app.js');
if (fs.existsSync(binPath)) {
  // Make the bin script executable on Unix systems
  try {
    fs.chmodSync(binPath, '755');
    console.log('✅ Made bin script executable');
  } catch (error) {
    console.log('⚠️ Could not make bin script executable:', error.message);
  }
}
