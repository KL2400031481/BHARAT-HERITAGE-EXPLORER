const fs = require('fs');
const path = require('path');

console.log('check-install: node', process.version, 'npm', process.env.npm_config_user_agent || 'unknown');

const nodeModules = path.resolve(__dirname, '..', 'node_modules');
const reactScriptsPath = path.join(nodeModules, 'react-scripts');

if (fs.existsSync(reactScriptsPath)) {
  console.log('check-install: react-scripts found at', reactScriptsPath);
  process.exit(0);
} else {
  console.error('check-install: react-scripts NOT found.');
  console.error('check-install: directory listing of node_modules (top-level):');
  try {
    const list = fs.readdirSync(nodeModules);
    console.error(list.join('\n'));
  } catch (err) {
    console.error('check-install: could not read node_modules:', err.message);
  }
  console.error('\nIf this runs on CI (Render), consider clearing the build cache and redeploying.');
  process.exit(1);
}
