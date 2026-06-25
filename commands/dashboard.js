import boxen from 'boxen';
import chalk from 'chalk';
import { getDbData } from '../utils/db.js';

export function showDashboard() {
    const data = getDbData();
    const termWidth = process.stdout.columns || 80;
    const isMobile = termWidth < 90;
    
    const formatRp = (num) => `Rp${num.toLocaleString('id-ID')}`;

    const balance = `💰 Saldo\n${formatRp(data.balance)}`;
    
    const pbLength = isMobile ? 20 : 40;
    const target = `🎯 Target\n${getProgressBar(data.progress, pbLength)} ${data.progress}%`;
    
    const stats = `📈 Bulan Ini\n${chalk.green('+' + formatRp(data.income))}\n\n📉 Pengeluaran\n${chalk.red(formatRp(data.expense))}`;
    
    const streak = `🔥 Streak\n${data.streak} Hari`;

    if (isMobile) {
        const separatorLength = Math.min(termWidth, 30);
        const separator = chalk.dim('━'.repeat(separatorLength));
        
        console.log(separator);
        console.log(balance);
        console.log();
        console.log(target);
        console.log();
        console.log(stats);
        console.log();
        console.log(streak);
        console.log(separator);
        console.log();
    } else {
        const boxWidth = Math.max(30, Math.min(termWidth - 4, 60));
        const divider = chalk.dim('━'.repeat(boxWidth - 4));
        const content = `${balance}\n${divider}\n${target}\n${divider}\n${stats}\n${divider}\n${streak}`;

        console.log(boxen(content, {
            padding: 1,
            borderColor: 'cyan',
            borderStyle: 'double',
            width: boxWidth
        }));
    }
}

function getProgressBar(percent, length) {
    const filled = Math.round((percent / 100) * length);
    const empty = length - filled;
    return chalk.green('█'.repeat(filled)) + chalk.dim('░'.repeat(empty > 0 ? empty : 0));
}
