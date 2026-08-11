#!/usr/bin/env node
import { init } from './commands/init.js';

const [, , command] = process.argv;

switch (command) {
  case 'init':
    await init();
    break;
  default:
    console.log(`Unknown command: ${command ?? '(none)'}\n\nUsage: venia init`);
    process.exit(1);
}