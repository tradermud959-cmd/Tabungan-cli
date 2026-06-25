import { initSplash, showMenu } from './utils/ui.js';
import { loadDatabase } from './utils/db.js';

async function main() {
    await initSplash();
    await loadDatabase();
    await showMenu();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
