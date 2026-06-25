import inquirer from 'inquirer';
import chalk from 'chalk';
import { getDbData, saveDatabase } from '../utils/db.js';
import { showSuccess, showError } from '../utils/ui.js';
import dayjs from 'dayjs';

export async function addData() {
    console.clear();
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Jenis Data:',
            choices: ['Pemasukan', 'Pengeluaran']
        },
        {
            type: 'number',
            name: 'amount',
            message: 'Jumlah (Rp):',
            validate: (val) => val > 0 || 'Jumlah harus lebih dari 0!'
        },
        {
            type: 'input',
            name: 'desc',
            message: 'Keterangan:'
        }
    ]);

    if (isNaN(answer.amount)) {
        showError('Input tidak valid.');
        await new Promise(r => setTimeout(r, 1500));
        return;
    }

    const db = getDbData();
    if (answer.type === 'Pemasukan') {
        db.balance += answer.amount;
        db.income += answer.amount;
    } else {
        db.balance -= answer.amount;
        db.expense += answer.amount;
    }

    db.history.push({
        date: dayjs().format('YYYY-MM-DD'),
        type: answer.type,
        amount: answer.amount,
        desc: answer.desc || '-'
    });

    if (db.progress < 100 && answer.type === 'Pemasukan') {
        db.progress = Math.min(100, db.progress + 2);
    }

    await saveDatabase();
    console.log('');
    showSuccess('Data berhasil disimpan.');
    
    if (db.progress >= 100) {
        console.log(chalk.yellowBright('🎉 TARGET TERCAPAI!'));
    }
    
    await new Promise(r => setTimeout(r, 2000));
}
