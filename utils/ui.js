import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import boxen from 'boxen';
import inquirer from 'inquirer';

import { showDashboard } from '../commands/dashboard.js';
import { addData } from '../commands/add.js';
import { showStats } from '../commands/stats.js';
import { showHistory } from '../commands/history.js';
import { showChart } from '../commands/chart.js';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export async function initSplash() {
    console.clear();
    const banner = figlet.textSync('CYBER CLI', { font: 'Standard' });
    console.log(gradient.pastel.multiline(banner));

    const anim = chalkAnimation.rainbow('Initializing System...\n');
    await sleep(1000);
    anim.stop();

    const spinner = createSpinner('Initializing Modules...').start();
    await sleep(400);
    spinner.update({ text: 'Loading Database...' });
    await sleep(400);
    spinner.update({ text: 'Checking Backup...' });
    await sleep(400);
    spinner.update({ text: 'Preparing Dashboard...' });
    await sleep(400);
    spinner.success({ text: 'Done.' });
    await sleep(500);
}

export async function showMenu() {
    while (true) {
        console.clear();
        showDashboard();

        const answers = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: '📋 MENU\n',
            choices: [
                '➜ Tambah Data',
                'Statistik',
                'Riwayat',
                'Grafik',
                'Kalender',
                'Backup',
                'Pengaturan',
                'Keluar'
            ]
        });

        switch (answers.action) {
            case '➜ Tambah Data': await addData(); break;
            case 'Statistik': await showStats(); break;
            case 'Riwayat': await showHistory(); break;
            case 'Grafik': await showChart(); break;
            case 'Kalender':
            case 'Backup':
            case 'Pengaturan':
                showError('Fitur belum diimplementasikan.');
                await sleep(1500);
                break;
            case 'Keluar':
                console.clear();
                console.log(chalk.magenta('Goodbye!'));
                process.exit(0);
        }
    }
}

export function showError(msg) {
    const termWidth = process.stdout.columns || 80;
    if (termWidth < 90) {
        const sep = chalk.red('┌────────────────────────┐');
        const sep2 = chalk.red('└────────────────────────┘');
        console.log(sep);
        console.log(chalk.redBright('❌ ERROR'));
        console.log(msg);
        console.log(sep2);
    } else {
        console.log(boxen(chalk.redBright('❌ ERROR\n\n' + msg), { padding: 1, borderColor: 'red' }));
    }
}

export function showSuccess(msg) {
    console.log(chalk.greenBright(`✔ ${msg}`));
}
