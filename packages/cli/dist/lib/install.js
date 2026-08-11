import { spawn } from 'node:child_process';
import { installCommand } from '../detectors/package-manager.js';
export function installPackages(pm, packages) {
    const [cmd, args] = installCommand(pm, packages);
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args, { stdio: 'pipe' });
        let stderr = '';
        child.stderr?.on('data', (chunk) => {
            stderr += chunk.toString();
        });
        child.on('close', (code) => {
            if (code === 0)
                resolve();
            else
                reject(new Error(`${cmd} ${args.join(' ')} exited with code ${code}\n${stderr}`));
        });
        child.on('error', reject);
    });
}
