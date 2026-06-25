import boxen from 'boxen';
import chalk from 'chalk';
import { getDbData } from '../utils/db.js';

export function showDashboard() {
    const data = getDbData();
    const termWidth = process.stdout.columns || 50;
    const boxWidth = Math.max(30, Math.min(termWidth - 4, 60));
    
    const formatRp = (num) => `Rp${num.toLocaleString('id-ID')}`;

    const balance = `💰 Saldo\n${formatRp(data.balance)}`;
    const target = `🎯 Target\n${getProgressBar(data.progress, boxWidth)} ${data.progress}%`;
    const stats = `📈 Bulan Ini\n${chalk.green('+' + formatRp(data.income))}\n\n📉 Pengeluaran\n${chalk.red(formatRp(data.expense))}`;
    const streak = `🔥 Streak\n${data.streak} Hari`;

    const divider = chalk.dim('━'.repeat(boxWidth - 4));
    const content = `${balance}\n${divider}\n${target}\n${divider}\n${stats}\n${divider}\n${streak}`;

    console.log(boxen(content, {
        padding: 1,
        borderColor: 'cyan',
        borderStyle: 'double',
        width: boxWidth
    }));
}

function getProgressBar(percent, boxWidth) {
    const totalBars = Math.max(10, boxWidth - 20);
    const filled = Math.round((percent / 100) * totalBars);
    return chalk.green('█'.repeat(filled)) + chalk.dim('░'.repeat(totalBars - filled));
}
