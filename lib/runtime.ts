import arg from 'arg';
import path from 'path';
import fs from 'fs';
import { Start } from './env/start';
import { Dev } from './env/dev';
import { Build } from './env/build';

const args = arg({
  '--version': Boolean,
  '--port': Number,
  '-v': '--version',
  '-p': '--port',
});

if (args['--version']) {
  const pkgJsonPath = path.join(process.cwd(), 'package.json');
  const localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  console.log(`nextron v${localPkgJson.version}`);
  process.exit(0);
}

/*
 * 開発環境起動
 */
if (args._[0] === 'start') {
  (async () => {
    await new Start().start();
  })();
}

if (args._[0] === 'dev') {
  (async () => {
    await new Dev().start();
  })();
}

/*
 * ビルド
 */
if (args._[0] === 'build') {
  (async () => {
    await new Build().start();
  })();
}
