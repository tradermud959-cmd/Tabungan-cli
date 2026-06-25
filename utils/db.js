import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

let dbData = {
    balance: 2500000,
    progress: 60,
    income: 500000,
    expense: 150000,
    streak: 25,
    history: []
};

export async function loadDatabase() {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        dbData = JSON.parse(data);
    } catch (err) {
        await saveDatabase();
    }
}

export async function saveDatabase() {
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify(dbData, null, 2));
}

export function getDbData() {
    return dbData;
}
