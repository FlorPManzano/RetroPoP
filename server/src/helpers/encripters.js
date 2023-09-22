import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

async function hashPassword(password) {
    const salt = await bcrypt.hash(password, 10);
    return salt;
}

async function comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

function generateCode() {
    return crypto.randomUUID();
}

export { hashPassword, comparePasswords, generateCode };
