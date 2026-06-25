import chalk from 'chalk';
import inquirer from 'inquirer';

export async function showChart() {
    console.clear();
    console.log(chalk.cyanBright('\n=== GRAFIK AKTIVITAS ===\n'));
    
    const termWidth = process.stdout.columns || 80;
    const isMobile = termWidth < 90;
    const maxBars = isMobile ? 20 : Math.max(10, Math.min(termWidth - 10, 40));

    const months = ['Jan', 'Feb', 'Mar', 'Apr'];
    const values = [7, 11, 5, 9];
    const colors = [chalk.magenta, chalk.greenBright, chalk.cyanBright, chalk.yellowBright];

    months.forEach((m, i) => {
        const barLength = Math.round((values[i] / 15) * maxBars);
        const bar = '█'.repeat(barLength);
        console.log(`${m} ${colors[i](bar)}`);
    });

    console.log('\n');
    await inquirer.prompt({ type: 'input', name: 'back', message: 'Tekan Enter untuk kembali' });
}
