import { build } from 'bun';
import fs from 'fs';

const entrypoints = [
  './src/main.ts',
  './src/shells/tanstack-react-router.ts',
];

const external = [
  'react',
  'react-dom',
  'react-router-dom',
  '@tanstack/react-router'
];

async function runBuild() {
  const result =   await build({
    entrypoints,
    outdir: './dist',
    target: 'browser',
    sourcemap: 'external',
    minify: true,
    external,
  });

  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  pkg.exports = {
    ".": "./dist/main.js"
  };

  result.outputs.forEach((artifact: any) => {
    if (artifact.kind !== 'entry-point') return;
    if (artifact.path.endsWith('main.js')) return;
    const name = artifact.path.split(/\\|\//).pop();
    pkg.exports[`./${name}`] = `./dist/shells/${name}`;
  });

  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n');
  console.log('Build and package.json exports updated successfully.');
}


function isWatch() {
  return process.env.npm_lifecycle_script.includes('--watch')
}

isWatch() && fs.watch(process.cwd() + '/src', { recursive: true }, runBuild);
runBuild();
