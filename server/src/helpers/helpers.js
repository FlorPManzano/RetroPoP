import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import selectUserByEmailModel from '../models/users/selectUserByEmailModel.js';

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

async function userIsActive(email) {
    const user = await selectUserByEmailModel(email);
    return user.isActive;
}

export { hashPassword, comparePasswords, generateCode, userIsActive };
