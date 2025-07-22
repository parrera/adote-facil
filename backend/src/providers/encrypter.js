import bcrypt from 'bcrypt';
export class Encrypter {
    encrypt(value) {
        return bcrypt.hashSync(value, 10);
    }
    compare(value, hash) {
        return bcrypt.compareSync(value, hash);
    }
}
export const encrypterInstance = new Encrypter();
