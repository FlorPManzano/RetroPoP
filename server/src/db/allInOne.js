import { main } from './initDb.js';
import { backupDb } from './backupDb.js';

// const restoreDb = async () => {
//     try {
//         main;
//     } catch (err) {
//         console.log(err);
//     }
// };

// const insertDb = async () => {
//     try {
//         console.log('ESTO SALE??');
//         backupDb;
//     } catch (err) {
//         console.log(err);
//     }
// };

Promise.all([main, backupDb]).then((values) => {
    console.log(values); // [3, 1337, "foo"]
    console.log('Ha temrminado');
});

// restoreDb();
// // insertDb();
