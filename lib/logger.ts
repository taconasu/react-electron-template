import chalk from 'chalk';

export default function log(text: string) {
  console.log(chalk`{cyan [react-electron-template]} ${text}`);
}
