import Table from 'cli-table3';
import chalk from 'chalk';
import { getDbData } from '../utils/db.js';
import inquirer from 'inquirer';

export async function showStats() {
    console.clear();
    console.log(chalk.cyanBright('\n=== STATISTIK KEUANGAN ===\n'));
    const db = getDbData();
    const termWidth = process.stdout.columns || 50;
    const colWidth = Math.max(20, Math.floor((termWidth - 5) / 2));

    const table = new Table({
        head: [chalk.cyan('Kategori'), chalk.cyan('Total (Rp)')],
        colWidths: [colWidth, colWidth],
        wordWrap: true
    });

    table.push(
        ['Saldo Saat Ini', db.balance.toLocaleString('id-ID')],
        ['Total Pemasukan', chalk.green('+' + db.income.toLocaleString('id-ID'))],
        ['Total Pengeluaran', chalk.red('-' + db.expense.toLocaleString('id-ID'))]
    );

    console.log(table.toString());
    await inquirer.prompt({ type: 'input', name: 'back', message: 'Tekan Enter untuk kembali' });
}
