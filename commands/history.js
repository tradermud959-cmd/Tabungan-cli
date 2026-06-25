import Table from 'cli-table3';
import chalk from 'chalk';
import { getDbData } from '../utils/db.js';
import inquirer from 'inquirer';

export async function showHistory() {
    console.clear();
    console.log(chalk.magenta('\n=== RIWAYAT TERAKHIR ===\n'));
    const db = getDbData();
    
    const termWidth = process.stdout.columns || 60;
    const w1 = Math.max(12, Math.floor(termWidth * 0.2));
    const w2 = Math.max(12, Math.floor(termWidth * 0.2));
    const w3 = Math.max(15, Math.floor(termWidth * 0.25));
    const w4 = Math.max(10, Math.floor(termWidth * 0.25));

    const table = new Table({
        head: [chalk.cyan('Tanggal'), chalk.cyan('Tipe'), chalk.cyan('Nominal'), chalk.cyan('Ket')],
        colWidths: [w1, w2, w3, w4],
        wordWrap: true
    });

    const recent = db.history.slice(-10);
    if (recent.length === 0) {
        table.push([{ colSpan: 4, content: 'Belum ada riwayat.', hAlign: 'center' }]);
    } else {
        recent.forEach(h => {
            const color = h.type === 'Pemasukan' ? chalk.green : chalk.red;
            table.push([h.date, color(h.type), color(h.amount.toLocaleString('id-ID')), h.desc]);
        });
    }

    console.log(table.toString());
    await inquirer.prompt({ type: 'input', name: 'back', message: 'Tekan Enter untuk kembali' });
}
