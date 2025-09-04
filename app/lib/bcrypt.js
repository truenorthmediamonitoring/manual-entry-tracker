import bcrypt from "bcrypt";

export async function hashPass(psw) {
    return bcrypt.hash(psw, 10).then((hash) => {
        return hash;
    });
}

export async function comparePass(psw, hash) {
    return bcrypt.compare(psw, hash).then((result) => {
        return result;
    });
}